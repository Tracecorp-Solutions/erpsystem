using Core.DTOs;
using Core.Models;
using Core.Repositories.Billing;
using Core.Repositories.UserManagement;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
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

        private readonly IUserRepository _userRepository;

        public NewConnectionRepository(ApplicationDbContext context,IUserRepository userRepository) 
        {
            _context = context;
            _userRepository = userRepository;
        }

        public async Task<string> RegisterNewCustomer(IFormFile file,NewApplicationDto application) 
        {
            // generate random application number and assign it to application number

            //check whether files have been uploaded
            if (file == null)
                throw new ArgumentNullException("Please attach the files");


            //map NewApplicationDto to new application
            var newapplication = new Application
            {
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
                ApplicationDate = DateOnly.FromDateTime(DateTime.Now)
            };


            newapplication.ApplicationNumber = Guid.NewGuid().ToString("N").Substring(0, 8);
            _context.Applications.Add(newapplication);
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

            if (application == null)
                throw new ArgumentException("No applications found");

            // Get surveyor by surveyor Id
            var surveyor = await _userRepository.GetUserById(report.SurveyorId);

            if (surveyor == null)
                throw new ArgumentException("No Surveyor found");

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
                DateCreated = DateTime.Now
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

    }
}
