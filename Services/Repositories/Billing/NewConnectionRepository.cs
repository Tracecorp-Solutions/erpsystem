using Core.DTOs.Billing;
using Core.DTOs.UserManagement;
using Core.Models.Billing;
using Core.Repositories.Billing;
using Core.Repositories.Settings;
using Core.Repositories.UserManagement;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Services.Repositories.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net.Sockets;
using System.Reflection;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Services.Repositories.Billing
{
    public class NewConnectionRepository : INewConnectionRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ISettings _settings;

        private readonly IUserRepository _userRepository;

        public NewConnectionRepository(ApplicationDbContext context,IUserRepository userRepository, ISettings settings) 
        {
            _context = context;
            _userRepository = userRepository;
            _settings = settings;
        }

        public async Task<string> RegisterNewCustomer(List<IFormFile> file,NewApplicationDto application) 
        {
            // generate random application number and assign it to application number

            //check whether files have been uploaded
            if (file.Count != 4)
                throw new ArgumentNullException("All files should be uploaded {ProofOfIdentity,ProofOfOwnerShip,ProofOfInstallationSite,LocalAuthorizationDocument}");

            var ProofOfIdentity = await _settings.SaveFileAndReturnPathAsync(file[0]);
            var ProofOfOwnerShip = await _settings.SaveFileAndReturnPathAsync(file[1]);
            var ProofOfInstallationSite = await _settings.SaveFileAndReturnPathAsync(file[2]);
            var LocalAuthorizationDocument = await _settings.SaveFileAndReturnPathAsync(file[3]);
            //map NewApplicationDto to new application
            var newapplication = new Application
            {
                ApplicationNumber = Guid.NewGuid().ToString("N").Substring(0, 8),
                Title = application.Title,
                FullName = application.FullName,
                DateOfBirth = application.DateOfBirth,
                Gender = application.Gender,
                EmailAddress = application.EmailAddress,
                PhoneNumber = application.PhoneNumber,
                IdNumber = application.IdNumber,
                StateId = application.StateId,
                OperationAreaId = application.OperationAreaId,
                BranchId = application.BranchId,
                TerritoryId = application.TerritoryId,
                SubTerritoryId = application.SubTerritoryId,
                StreetAddress = application.StreetAddress,
                PlotNumber = application.PlotNumber,
                NearestLandMark = application.NearestLandMark,
                CustomerType = application.CustomerType,
                BillDeliveryMethod = application.BillDeliveryMethod,
                CustomerCategoryId = application.CustomerCategory,
                Status = "PENDING ASSIGNING SURVEYOR",
                ApplicationDate = DateOnly.FromDateTime(DateTime.Now),
                ProofOfIdentity = ProofOfIdentity,
                ProofOfOwnerShip = ProofOfOwnerShip,
                ProofOfInstallationSite = ProofOfInstallationSite,
                LocalAuthorizationDocument = LocalAuthorizationDocument
            };

            var applicationlog = new ApplicationLog
            {
                ApplicationNumber = newapplication.ApplicationNumber,
                Status = "PENDING SURVEY",
                Message = "Application has been submitted successfully",
                Date = DateTime.Now
            };


            newapplication.ApplicationNumber = Guid.NewGuid().ToString("N").Substring(0, 8);
            await _context.Applications.AddAsync(newapplication);
            _context.ApplicationLogs.Add(applicationlog);
            await _context.SaveChangesAsync();
            return newapplication.ApplicationNumber;
        }

        public async Task<IEnumerable<Application>> GetApplications() 
        {
            var applications = await _context.Applications
                .Include(a => a.State)
                .Include(a => a.OperationArea)
                .Include(a => a.Branch)
                .Include(a => a.Territory)
                .Include(a => a.SubTerritory)
                .Include(a => a.CustomerCategory)
                .ToListAsync();
            return applications == null ? throw new ArgumentException("No applications found") : applications;  
        }

        public async Task<IEnumerable<SurveyorDto>> GetSurveyor()
        {
            var surveyors = await _userRepository.GetUsersByRoleName("Surveyor");

            return surveyors == null ? throw new ArgumentException("No Surveyors found") : surveyors.Select(s => new SurveyorDto
            {
                Id = s.Id,
                Name = s.FullName
            });
        }

        public async Task<Application> GetApplicationByApplicationId(string applicationId)
        {
            // Get application by application Id
            var application = await _context.Applications
                .Include(a => a.State)
                .Include(a => a.OperationArea)
                .Include(a => a.Branch)
                .Include(a => a.Territory)
                .Include(a => a.SubTerritory)
                .Include(a => a.CustomerCategory)
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.ApplicationNumber == applicationId);

            if (application == null)
                throw new ArgumentException("No applications found");

            return application;
        }

        public async Task<string> AssignSurveyor(string applicationId, int surveyorId,DateOnly ScheduledDate)
        {
            // Get application by application Id
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == applicationId);


            //check whether application has status of PENDING ASSIGNING SURVEYOR
            if (application.Status != "PENDING ASSIGNING SURVEYOR")
                throw new ArgumentException("Application status should be PENDING ASSIGNING SURVEYOR");

            if (application == null)
                throw new ArgumentException("No applications found");

            // Get surveyor by surveyor Id
            var surveyor = await _userRepository.GetUserById(surveyorId);

            if (surveyor == null)
                throw new ArgumentException("No Surveyor found");

            //add application log

            var applicationLog = new ApplicationLog
            {
                ApplicationNumber = application.ApplicationNumber,
                Status = "PENDING SURVEY",
                Message = "Surveyor has been assigned",
                Date = DateTime.Now
            };

            await _context.ApplicationLogs.AddAsync(applicationLog);

            
            application.AssignedTo = surveyorId;
            application.Status = "PENDING SURVEY";
            await _context.SaveChangesAsync();

            return "Surveyor assigned successfully";
        }

        public async Task<string> SubmitSurveyReport(IFormFile formFile,SurveyReportDto report)
        {
            // Get application by application Id
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == report.ApplicationNumber);

            //check whether application has status of PENDING SURVEY
            if (application.Status != "PENDING JOB CARD")
                throw new ArgumentException("Application status should be PENDING SURVEY");

            //check whether files have been uploaded
            if (formFile == null)
                throw new ArgumentNullException("Survey report file should be uploaded");

            if (application == null)
                throw new ArgumentException("No applications found");

            // Get surveyor by surveyor Id
            var surveyor = await _userRepository.GetUserById(report.SurveyorId);

            if (surveyor == null)
                throw new ArgumentException("No Surveyor found");

            // Save survey report file
            var surveyReportFile = await _settings.SaveFileAndReturnPathAsync(formFile);

            //map SurveyReportDto to survey report
            var surveyReport = new SurveyReport
            {
                SurveyorId = report.SurveyorId,
                ApplicationId = application.Id,
                DistanceFromMain = report.DistanceFromMain,
                LandType = report.LandType,
                Obstractions = report.Obstractions,
                MainLineDetails = report.MainLineDetails,
                ServicePipeSize = report.ServicePipeSize,
                ServicePipeLength = report.ServicePipeLength,
                IdealConnectionType = report.IdealConnectionType,
                ServicePipeMaterial = report.ServicePipeMaterial,
                ExistingMainSize = report.ExistingMainSize,
                ServicePipeDepth = report.ServicePipeDepth,
                ConnectionFromExistingServicePipe = report.ConnectionFromExistingServicePipe,
                ExistingConnections = report.ExistingConnections,
                BlocMapNumber = report.BlocMapNumber,
                NearByCustomer = report.NearByCustomer,
                DistanceToConnectionPoint = report.DistanceToConnectionPoint,
                ConnectionMainDetails = report.ConnectionMainDetails,
                RoadInformation = report.RoadInformation,
                Recommendation = report.Recommendation,
                DateCreated = DateTime.Now,
                SurveryReportFile = surveyReportFile,
            };

            _context.surveyReports.Add(surveyReport);
            await _context.SaveChangesAsync();

            //add application log
            var applicationLog = new ApplicationLog
            {
                ApplicationNumber = application.ApplicationNumber,
                Status = "PENDING CONNECTION INVOICE",
                Message = "Survey report has been submitted",
                Date = DateTime.Now
            };
            await _context.ApplicationLogs.AddAsync(applicationLog);

            application.Status = "PENDING CONNECTION INVOICE";
            await _context.SaveChangesAsync();

            return "Survey report submitted successfully";
        }

        public async Task<string> GetNewConnectionInvoice(string applicationNumber)
        {
            //check whetger application exists
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == applicationNumber);
            if (application == null)
                throw new ArgumentException("No application found with that application ID");


            var connectionInvoice = await _context.NewConnectionInvoices
                .Include(i => i.Application)
                .Include(i => i.NewConnectionInvoiceMaterials)
                .ThenInclude(i => i.Material)
                .Include(i => i.Application.User)
                .FirstOrDefaultAsync(i => i.Application.ApplicationNumber == applicationNumber);
            if (connectionInvoice == null) throw new ArgumentException("No invoice found with that application ID");

            // Serialize to JSON using Newtonsoft.Json with settings to handle circular references
            var jsonSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                Formatting = Newtonsoft.Json.Formatting.Indented,
            };

            // update status of application and add application log
            application.Status = "PENDING INVOICE PAYMENT";
            
            //add application log
            var applicationLog = new ApplicationLog
            {
                ApplicationNumber = application.ApplicationNumber,
                Status = "PENDING INVOICE PAYMENT",
                Message = "Connection invoice has been generated",
                Date = DateTime.Now
            };

            await _context.ApplicationLogs.AddAsync(applicationLog);

            await _context.SaveChangesAsync();

            string json = JsonConvert.SerializeObject(connectionInvoice, jsonSettings);

            return json;
        }

        public async Task<IEnumerable<SurveyReport>> GetSurveyReports()
        {
            var surveyReports = await _context.surveyReports
                .Include(s => s.Application)
                .Include(s => s.Surveyor)
                .ToListAsync();

            return surveyReports == null ? throw new ArgumentException("No survey reports found") : surveyReports;
        }

        public async Task ApproveOrRejectApplication(ApplicationApprovalDto approvalDto)
        {

            // Get application by application Id
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == approvalDto.ApplicationNumber);

            if (application == null)
                throw new ArgumentException("No applications found");

            var applicationLog = new ApplicationLog
            {
                ApplicationNumber = application.ApplicationNumber,
                Status = approvalDto.Rejected ? "REJECTED" : "APPROVED",
                Message = approvalDto.Reason,
                Date = DateTime.Now
            };

            await SaveApplicationLog(applicationLog);

            if (application == null)
                throw new ArgumentException("No applications found");

            if (approvalDto.Rejected)
            {
                application.Status = "REJECTED";
            }
            else
            {
                application.Status = "APPROVED";
            }

            await _context.SaveChangesAsync();
        }

        private async Task SaveApplicationLog(ApplicationLog applicationLog) 
        {
            _context.ApplicationLogs.Add(applicationLog);
            await _context.SaveChangesAsync();
        } 

        public async Task<IEnumerable<ApplicationLog>> GetApplicationLogs(string applicationNumber) { 
            var applicationLogs = await _context.ApplicationLogs
                .Where(a => a.ApplicationNumber == applicationNumber)
                .ToListAsync();

            return applicationLogs == null ? throw new ArgumentException("No application logs found") : applicationLogs;}

        public async Task AuthorizeConnection(AuthorizeConnectionDto connectionDto) 
        {
            //check if application exists
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == connectionDto.ApplicationNumber);

            if (application == null) throw new ArgumentException("No application found with that application ID");

            //update application status to authorised for connection 
            application.CustomerCategoryId = connectionDto.ConnectionCategory;
            application.CustomerType = connectionDto.ConnectionType;
            application.Status = "APPROVED FOR CONNECTION";
            application.CustomertarrifId = connectionDto.tariffId;
            

            //save application log
            var applicationLog = new ApplicationLog
            {
                ApplicationNumber = application.ApplicationNumber,
                Status = "APPROVED FOR CONNECTION",
                Message = "CONNECTION AUTHORIZATION",
                Date = DateTime.Now
            };

            await SaveApplicationLog(applicationLog);
            await _context.SaveChangesAsync();
        }

        public async Task<string> GenerateJobCard(string applicationNumber,int userid)
        {
            //check if application exists
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == applicationNumber);

            if (application == null) throw new ArgumentException("No application found with that application ID");

            //check application status to see whether the jobcard can be generated
            if (application.Status != "PENDING SURVEY" 
                && application.Status !="PENDING CONNECTION" 
                && application.Status !="CONNECTED"
                && application.Status != "DISCONNECTED") throw new ArgumentException("Application status should be {PENDING SURVEY, PENDING CONNECTION,CONNECTED}");

            //generate job card number
            var jobCardNumber = Guid.NewGuid().ToString("N").Substring(0, 8);

            // set job type based on application status
            string jobtype = application.Status switch
            {
                "PENDING SURVEY" => "SURVEY",
                "PENDING CONNECTION" => "CONNECTION",
                "CONNECTED" => "DISCONNECTION",
                "DISCONNECTED" => "RECONNECTION",
                _ => "SURVEY"
            };

            //save job card
            var jobCard = new JobCard
            {
                applicationId = application.Id,
                JobCardNumber = jobCardNumber,
                AssignedUserId = userid,
                JobCardType = jobtype,
                Status = "PENDING",
                CreationDate = DateTime.Now,
                DateUpdated = DateTime.Now
            };

            //update status of the application
            application.Status = "PENDING JOB CARD";

            _context.JobCards.Add(jobCard);
            await _context.SaveChangesAsync();

            return jobCardNumber;
        }

        public async Task<string> AddConnectionInvoice(NewConnectionInvoiceDto invoiceDto)
        {
            //check if application exists
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == invoiceDto.ApplicationNumber);

            if (application == null) throw new ArgumentException("No application found with that application ID");

            //check application status to see whether the invoice can be generated
            if (application.Status != "APPROVED FOR CONNECTION") throw new ArgumentException("Application status should be {APPROVED FOR CONNECTION}");

            //check whether materials are available
            if (invoiceDto.materialsDtos.Count == 0) throw new ArgumentException("No Materials supplied");

            
            var connectionInvoice = new NewConnectionInvoice {
                ApplicationId = application.Id,
                InvoiceNumber = Guid.NewGuid().ToString("N").Substring(0, 8),
                NewConnectionInvoiceMaterials = invoiceDto.materialsDtos.Select(m => new NewConnectionInvoiceMaterials
                {
                    MaterialId = m.MaterialId,
                    Quantity = m.Quantity,
                    Price = m.Price
                }).ToList(),
                InvoiceDate = invoiceDto.Date,
                Status = "PENDING PAYMENT",
            };

            //update status of the application
            application.Status = "PENDING INVOICE PAYMENT";

            //add application log
            await _context.ApplicationLogs.AddAsync(new ApplicationLog
            {
                ApplicationNumber = application.ApplicationNumber,
                Status = "PENDING INVOICE PAYMENT",
                Message = "Connection Invoice has been generated",
                Date = DateTime.Now
            });


            _context.NewConnectionInvoices.Add(connectionInvoice);
            await _context.SaveChangesAsync();

            return connectionInvoice.InvoiceNumber;
        }

        

        public async Task AddDocketInitiation(DocketInitiationDto docket)
        {
            //get applicationid based on application number
            var application = await _context.Applications.FirstOrDefaultAsync(a => a.ApplicationNumber == docket.ApplicationNumber);

            if (application == null)
                throw new ArgumentException("No Application found with that applicationNumber");

            //update status of the application
            application.Status = "CUSTOMER CONNECTED";

            //map doketInitiationDto to docketInitiation model
            var docketInitaition = new DocketInitiation
            {
                ApplicationId = application.Id,
                CustomerRef = docket.CustomerRef,
                MeterNumber = docket.MeterNumber,
                BlockNumber = docket.BlockNumber,
                MeterType = docket.MeterType,
                MeterSize = docket.MeterSize,
                LocationCordinates = docket.LocationCordinates,
                InitialReading = docket.InitialReading,
                Dials = docket.Dials,
                MeterManufactureDate = docket.MeterManufactureDate,
                DateOfInstallation = docket.DateOfInstallation,
                InstalledBy = docket.InstalledBy,
                Remarks = docket.Remarks
            };

            //add application log
            await _context.ApplicationLogs.AddAsync(new ApplicationLog
            {
                ApplicationNumber = application.ApplicationNumber,
                Status = "CUSTOMER CONNECTED",
                Message = "Docket Initiation has been submitted",
                Date = DateTime.Now
            });

            //add customer to billing customer table
            await _context.BillingCustomers.AddAsync(new BillingCustomer
            {
                ApplicationId = application.Id,
                CustomerRef = docket.CustomerRef,
                TarrifId = 1
            });

            // save docket
            _context.DocketInitiations.Add(docketInitaition);
            await _context.SaveChangesAsync();
        }



        public async Task<string> GenerateCustomerRef()
        {
            //generate random customer ref
            var customerRef = Guid.NewGuid().ToString("N").Substring(0, 8);

            // check whether there is any record with the same customer ref in docket initiation
            var docketInitiation = await _context.DocketInitiations.FirstOrDefaultAsync(d => d.CustomerRef == customerRef);

            //if there is a record with the same customer ref, generate another customer ref
            if (docketInitiation != null) return await GenerateCustomerRef();

            return customerRef.ToUpper();
        }

        public async Task<DocketInitiation> GetDocketInitiationByApplicationNumber(string applicationNumber) 
        {
            //get applicationid based on application number
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == applicationNumber);

            if (application == null)
                throw new ArgumentException("No Application found with that applicationNumber");

            var docketinitiation = await _context.DocketInitiations
                .Include(d => d.Application)
                .Include(d => d.Application.CustType)
                .Include(d => d.User)
                .FirstOrDefaultAsync(d => d.ApplicationId == application.Id);
            return docketinitiation == null ? throw new ArgumentException("No Docket initiation for that ApplicationNumber") : docketinitiation;
               
        }

        public async Task EditDocketInitiation(DocketInitiationDto docket) 
        {
            //get applicationid based on application number
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == docket.ApplicationNumber);

            if (application == null)
                throw new ArgumentException("No Application found with that applicationNumber");

            //get docket initiation based on application id
            var docketInitiation = await _context.DocketInitiations
                .FirstOrDefaultAsync(d => d.ApplicationId == application.Id);

            if (docketInitiation == null)
                throw new ArgumentException("No Docket initiation found for that application");

            //update docket initiation
            docketInitiation.MeterNumber = docket.MeterNumber;
            docketInitiation.BlockNumber = docket.BlockNumber;
            docketInitiation.MeterType = docket.MeterType;
            docketInitiation.MeterSize = docket.MeterSize;
            docketInitiation.LocationCordinates = docket.LocationCordinates;
            docketInitiation.InitialReading = docket.InitialReading;
            docketInitiation.Dials = docket.Dials;
            docketInitiation.MeterManufactureDate = docket.MeterManufactureDate;
            docketInitiation.DateOfInstallation = docket.DateOfInstallation;
            docketInitiation.InstalledBy = docket.InstalledBy;
            docketInitiation.Remarks = docket.Remarks;

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<NewConnectionInvoiceDto>> GetAllInvoices()
        {
            var invoices = await _context.NewConnectionInvoices
                .Include(i => i.Application)
                .Include(i => i.NewConnectionInvoiceMaterials)
                .ToListAsync();

            return invoices == null ? throw new ArgumentException("No invoices found") : invoices.Select(i => new NewConnectionInvoiceDto
            {
                ApplicationNumber = i.Application.ApplicationNumber,
                InvoiceNumber = i.InvoiceNumber,
                Date = i.InvoiceDate,
                Status = i.Status,
                InvoiceAmount = i.NewConnectionInvoiceMaterials.Sum(m => m.Price)
            });
        }

        public async Task<NewConnectionInvoiceDto> GetInvoiceByInvoiceNumber(string invoiceNumber) 
        {
            var invoice = await _context.NewConnectionInvoices
                .Include(i => i.Application)
                .Include(i => i.NewConnectionInvoiceMaterials)
                .FirstOrDefaultAsync(i => i.InvoiceNumber == invoiceNumber);

            if (invoice == null)
                throw new ArgumentException("No invoice found with that invoice number");

            return new NewConnectionInvoiceDto
            {
                ApplicationNumber = invoice.Application.ApplicationNumber,
                InvoiceNumber = invoice.InvoiceNumber,
                Date = invoice.InvoiceDate,
                Status = invoice.Status,
                InvoiceAmount = invoice.NewConnectionInvoiceMaterials.Sum(m => m.Price)
            };
        }

        public async Task AssignCustomerTarrif(string applicationNumber, int trarrifId) 
        {
            //get applicationid based on application number
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == applicationNumber);

            //get docket initiation for customer
            var docketInitiation = await _context.DocketInitiations
                .FirstOrDefaultAsync(d => d.ApplicationId == application.Id);

            if (docketInitiation == null)
                throw new ArgumentException("No Docket initiation found for that application");

            if (application == null)
                throw new ArgumentException("No Application found with that applicationNumber");

            //get customer tarrif based on tarrif id
            var customerTarrif = await _context.CustomerTarrifs
                .FirstOrDefaultAsync(t => t.Id == trarrifId);

            if (customerTarrif == null)
                throw new ArgumentException("No Customer Tarrif found with that tarrif ID");

            //create new customer in customer table with new tarrif

            await _context.BillingCustomers.AddAsync(new BillingCustomer
            {
                ApplicationId = application.Id,
                CustomerRef = docketInitiation.CustomerRef,
                TarrifId = trarrifId
            });

            //update status of the application
            application.Status = "CUSTOMER CONNECTED";

            //add application log
            await _context.ApplicationLogs.AddAsync(new ApplicationLog
            {
                ApplicationNumber = application.ApplicationNumber,
                Status = "CUSTOMER CONNECTED",
                Message = "Customer Tarrif has been assigned",
                Date = DateTime.Now
            });

            await _context.SaveChangesAsync();
        }

        public async Task<string> GetJobCardNumberByApplicationNumber(string applicationNumber) 
        {
            //get applicationid based on application number
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == applicationNumber);

            //get job card based on application id
            var jobCard = await _context.JobCards
                .FirstOrDefaultAsync(j => j.applicationId == application.Id);

            return jobCard == null ? throw new ArgumentException("No Job Card found for that application") : jobCard.JobCardNumber;
        }

        // get all plumbers
        public async Task<IEnumerable<SurveyorDto>> GetPlumbers()
        {
            var plumbers = await _userRepository.GetUsersByRoleName("Plumber");

            return plumbers == null ? throw new ArgumentException("No Plumbers found") : plumbers.Select(s => new SurveyorDto
            {
                Id = s.Id,
                Name = s.FullName
            });
        }

        // get all meter readers
        public async Task<IEnumerable<SurveyorDto>> GetMeterReaders()
        {
            var meterReaders = await _userRepository.GetUsersByRoleName("Meter Reader");

            return meterReaders == null ? throw new ArgumentException("No Meter Readers found") : meterReaders.Select(s => new SurveyorDto
            {
                Id = s.Id,
                Name = s.FullName
            });
        }

    }
}
