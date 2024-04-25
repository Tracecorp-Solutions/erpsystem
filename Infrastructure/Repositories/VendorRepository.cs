using Core.Models;
using Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class VendorRepository : IVendorRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAccountRepository _accountService;

        

        public VendorRepository(ApplicationDbContext context, IAccountRepository accountService)
        {
            _context = context;
            _accountService = accountService;
        }

        public async Task<Vendor> CreateVendorAsync(Vendor vendor)
        {
            // Create an account for the vendor with the opening balance
            var account = new Account
            {
                Name = $"{vendor.FirstName} {vendor.LastName}",
                Balance = vendor.OpeningBalance,
                SubGroupAccountId = 1
            };
            var createdAccount = await _accountService.CreateAccountAsync(account);
            vendor.AccountId = createdAccount.Id;
            // Create the vendor
            _context.Vendors.Add(vendor);
            await _context.SaveChangesAsync();
            return vendor;
        }

        public async Task<IEnumerable<Vendor>> GetAllVendors() 
        {
            IEnumerable<Vendor> vendors = await _context.Vendors
                .Include(e => e.Addres)
                .ToListAsync();
            return vendors;
        }
    }
}
