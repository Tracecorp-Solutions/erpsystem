using Core.Models;
using Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class BillRepository : IBillRepository
    {
        private readonly ApplicationDbContext _context;

        public BillRepository(ApplicationDbContext context) {  _context = context; }
        public async Task<Bill> CreateBillAsync(Bill bill)
        {
            if (bill.BillTranItems.Count < 1)
            {
                throw new ArgumentException("No transactions entered in the bill");
            }
            // Validate transaction items asynchronously
            foreach (var transaction in bill.BillTranItems)
            {
                var accountto = await _context.Accounts.FirstOrDefaultAsync( a => a.Id == transaction.AccountId);
                if (accountto == null)
                {
                    throw new ArgumentException("Account category not specified");
                }
            }
            // Add bill to context and save changes asynchronously
            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            return bill;
        }
        public async Task<IEnumerable<Bill>> GetBills()
        {
            var bills = await _context.Bills.Include(b => b.BillTranItems).ToListAsync();
            return bills;
        }
    }
}
