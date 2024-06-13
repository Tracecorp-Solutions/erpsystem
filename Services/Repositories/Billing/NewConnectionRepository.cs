using Core.DTOs;
using Core.Models;
using Core.Repositories.Billing;
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

        public NewConnectionRepository(ApplicationDbContext context) 
        {
            _context = context;
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
            var applications = await _context.Applications.ToListAsync();
            return applications == null ? throw new ArgumentException("No applications found") : applications;  
        }
    }
}
