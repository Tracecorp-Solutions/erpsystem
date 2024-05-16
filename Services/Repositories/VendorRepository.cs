using Core.Models;
using Core.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories
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
           if (vendor.CompanyName == null)
            {
                vendor.CompanyName = vendor.FullName;
            }
            var account = new Account
            {
                Name = vendor.CompanyName, //$"{vendor.FirstName} {vendor.LastName}",
                Balance = vendor.OpeningBalance,
                SubGroupAccountId = vendor.SubGroupId,
                Description = "Vendor Account "
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

        
        public async Task<IEnumerable<Vendor>> GetVendorById(VendorSearchView view) 
        {
            var vendor =  await _context.Vendors.Where(v => v.VendorType == view.VendType && v.Id == view.Id).ToListAsync();

            return vendor == null ? throw new ArgumentException("No Record found found") : vendor;
        }

        public async Task<string> UpdateVendor(Vendor vendor) 
        {
            //get vendor to edit
            var existingvendor = await _context.Vendors
                .FirstOrDefaultAsync(v => v.Id == vendor.Id);
            if (existingvendor == null)
                throw new ArgumentException("No record found for what you want to edit");

            _context.Entry(existingvendor).CurrentValues.SetValues(vendor);
            // save the changes 
            await _context.SaveChangesAsync();
            return "Record Updated Successfully";
        }


    }
}
