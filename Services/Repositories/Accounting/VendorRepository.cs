using Core.Models;
using Core.Repositories.Accounting;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories.Accounting
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

        public async Task<string> CreateVendorAsync(Vendor vendor)
        {
            // Validate vendor type
            if (vendor.VendorType != "Vendor" && vendor.VendorType != "Customer")
            {
                throw new ArgumentException("Vendor type must be either 'Vendor' or 'Customer'");
            }

            // Set CompanyName to FullName if null
            vendor.CompanyName = vendor.CompanyName ?? vendor.FullName;

            // Create and initialize account
            var account = new Account
            {
                Name = vendor.CompanyName,
                Balance = vendor.OpeningBalance,
                SubGroupAccountId = vendor.SubGroupId,
                Description = "Vendor Account",
                AccountType = "Cash at hand",
                AccountNumber = vendor.AccountNo
            };

            // Save account and set vendor's AccountId
            var createdAccount = await _accountService.CreateAccountAsync(account);
            vendor.AccountId = createdAccount.Id;

            // Add vendor to context and save changes
            _context.Vendors.Add(vendor);
            await _context.SaveChangesAsync();

            return vendor.VendorType;
        }



        public async Task<IEnumerable<Vendor>> GetAllVendors()
        {
            IEnumerable<Vendor> vendors = await _context.Vendors
                .Include(e => e.Addres)
                .ToListAsync();
            return vendors;
        }



        public async Task<IEnumerable<Vendor>> GetVendorByIdAsync(VendorSearchView view)
        {
            // Validate vendor type
            if (view.VendType != "Vendor" && view.VendType != "Customer")
                throw new ArgumentException("Vendor type must be either 'Vendor' or 'Customer'");

            // Get vendor(s) by id or vendor type
            var vendors = await _context.Vendors
                .Include(e => e.Addres)
                .Where(v => v.VendorType == view.VendType && v.Id == view.Id)
                .ToListAsync();

            // Check if any vendors were found and throw exception if not
            if (vendors == null || !vendors.Any())
                throw new ArgumentException("No record found");

            return vendors;
        }

        public async Task<IEnumerable<Vendor>> GetVendorsByTypeAsync(string type)
        {
            // Get vendors by type
            var vendors = await _context.Vendors
                .Where(v => v.VendorType == type)
                .ToListAsync();

            // Check if any vendors were found and throw exception if not
            if (vendors == null || !vendors.Any())
                throw new ArgumentException("No record found");

            return vendors;
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
