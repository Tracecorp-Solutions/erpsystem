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
                CustomerCategory = application.CustomerCategory
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

        public async Task<IEnumerable<SurveyDto>> GetSurveyor()
        {
            var surveyors = await _userRepository.GetUsersByRoleName("Surveyor");

            return surveyors == null ? throw new ArgumentException("No Surveyors found") : surveyors.Select(s => new SurveyDto
            {
                Id = s.Id,
                Name = s.FullName
            });
        }

    }
}
