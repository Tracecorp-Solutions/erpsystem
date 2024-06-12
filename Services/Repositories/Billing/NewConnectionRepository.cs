using Core.Models;
using Core.Repositories.Billing;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task RegisterNewCustomer(Application application) 
        {
            // generate random application number and assign it to application number
            //random 8 digit character

            application.ApplicationNumber = Guid.NewGuid().ToString("N").Substring(0, 8);
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Application>> GetApplications() 
        {
            var applications = await _context.Applications.ToListAsync();
            return applications == null ? throw new ArgumentException("No applications found") : applications;  
        }
    }
}
