using Core.Models;
using Core.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories
{
    public class BillRepository : IBillRepository
    {
        private readonly ApplicationDbContext _context;

        public BillRepository(ApplicationDbContext context) {  _context = context; }
        public async Task<Bill> CreateBillAsync(Bill bill)
        {
            if (bill.BillTranItems.Count < 1)
                throw new ArgumentException("No transactions entered in the bill");

            await ValidateBillType(bill.Type);
            ValidateBillStatus(bill.Status);

            await ValidateVendorAsync(bill.VendorId);

            await ValidateTransactionItemsAsync(bill.BillTranItems);

            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            return bill;
        }

        private async Task ValidateBillType(string type)
        {
            if (type != "Expense" && type != "Income")
                throw new ArgumentException("Bill type must be either 'Expense' or 'Income'");
        }   

        private void ValidateBillStatus(string status)
        {
            if (status != "Paid" && status != "Unpaid")
                throw new ArgumentException("Bill status must be either 'Paid' or 'Unpaid'");
        }

        private async Task ValidateVendorAsync(int vendorId)
        {
            var vendor = await _context.Vendors.FirstOrDefaultAsync(v => v.Id == vendorId);
            if (vendor == null)
                throw new ArgumentException("Vendor not specified");
        }

        private async Task ValidateTransactionItemsAsync(List<BillTranItems> transactions)
        {
            var accountTasks = transactions.Select(t => ValidateAccountAsync(t.AccountId)).ToList();
            await Task.WhenAll(accountTasks);
        }

        private async Task ValidateAccountAsync(int accountId)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == accountId);
            if (account == null)
                throw new ArgumentException("Account category not specified");
        }

        public async Task<IEnumerable<BillViewModel>> GetBills()
        {
            var bills = await _context.Bills
                .Include(b => b.BillTranItems)
                .Include(b => b.Vendor)
                .ToListAsync();

            // map bills to view model
            var billviewmodels = bills.Select(b => new BillViewModel
            {
                Id = b.Id,
                BillDate = b.BillDate,
                DueDate = b.DueDate,
                BillNo = b.BillNo,
                BillTranItems = b.BillTranItems,
                TotalAmount = b.TotalAmount,
                Type = b.Type,
                Narration = b.Narration,
                Status = b.Status,
                Vendor = b.Vendor
            });
            return billviewmodels;
        }
    }
}
