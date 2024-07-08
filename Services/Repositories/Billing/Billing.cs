using Core.Models.Billing;
using Core.Repositories.Billing;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories.Billing
{
    public class Billing : IBilling
    {
        private readonly ApplicationDbContext _context;

        public Billing(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddBillingRequest(BillingRequest billingRequest)
        {
            await _context.BillingRequests.AddAsync(billingRequest);
            await _context.SaveChangesAsync();
        }
    }
}
