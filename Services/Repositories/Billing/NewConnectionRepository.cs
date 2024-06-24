using Core.DTOs.Billing;
using Core.DTOs.UserManagement;
using Core.Models.Billing;
using Core.Repositories.Billing;
using Core.Repositories.Settings;
using Core.Repositories.UserManagement;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

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
                Status = "PENDING SURVEY",
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
            _context.Applications.Add(newapplication);
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

            if (application == null)
                throw new ArgumentException("No applications found");

            // Get surveyor by surveyor Id
            var surveyor = await _userRepository.GetUserById(surveyorId);

            if (surveyor == null)
                throw new ArgumentException("No Surveyor found");

            
            application.AssignedTo = surveyorId;
            application.Status = "ASSIGNED TO SURVEYOR";
            await _context.SaveChangesAsync();

            return "Surveyor assigned successfully";
        }

        public async Task<string> SubmitSurveyReport(IFormFile formFile,SurveyReportDto report)
        {
            // Get application by application Id
            var application = await _context.Applications
                .FirstOrDefaultAsync(a => a.ApplicationNumber == report.ApplicationNumber);

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

            application.Status = "SURVEY REPORT SUBMITTED";
            await _context.SaveChangesAsync();

            return "Survey report submitted successfully";
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


            _context.NewConnectionInvoices.Add(connectionInvoice);
            await _context.SaveChangesAsync();

            return connectionInvoice.InvoiceNumber;
        }

        public async Task<NewConnectionInvoice> GetNewConnectionInvoice(string applicationNumber)
        {
            var connectionInvoice = await _context.NewConnectionInvoices
                .Include(i => i.Application)
                .Include(i => i.NewConnectionInvoiceMaterials)
                .FirstOrDefaultAsync(i => i.Application.ApplicationNumber == applicationNumber);

            return connectionInvoice == null ? throw new ArgumentException("No invoices found") : connectionInvoice;
        }

    }
}
