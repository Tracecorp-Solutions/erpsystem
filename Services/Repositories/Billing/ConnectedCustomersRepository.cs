using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTOs.Billing;
using Core.Repositories.Billing;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Services.Repositories.Billing
{
    public class ConnectedCustomersRepository : IConnectedCustomersRepository
    {
        private readonly ApplicationDbContext _context;

        public ConnectedCustomersRepository(ApplicationDbContext context) { _context = context; }

        public async Task<IEnumerable<ConnectedCustomerDto>> GetConnectedCustomers()
        {
            var connectedCustomers = await _context.BillingCustomers
                .Include(x => x.Application)
                .Where(x => x.Application.Status == "Connected")
                .Select(x => new ConnectedCustomerDto
                {
                    CustomerRef = x.CustomerRef,
                    FullName = x.Application.FullName,
                    ApplicationNo = x.Application.ApplicationNumber,
                    Balance = "0",//x.Balance,
                    DateConnected = DateOnly.FromDateTime( x.DateConnected)
                }).ToListAsync();

            return connectedCustomers;
        }

        
    }
}
