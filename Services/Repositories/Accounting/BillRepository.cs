using Core.Models;
using Core.Repositories.Accounting;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories.Accounting
{
    public class BillRepository : IBillRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ITransactionRepository _transactionRepository;

        public BillRepository(ApplicationDbContext context, ITransactionRepository transactionRepository)
        {
            _context = context; _transactionRepository = transactionRepository;
        }
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

        public async Task<string> PayBill(int id)
        {
            var bill = await _context.Bills
                .Include(b => b.BillTranItems)
                .Include(b => b.Vendor)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (bill == null)
                throw new ArgumentException("No bill found with that id");

            if (bill.Status == "Paid")
                throw new ArgumentException("Bill has already been paid");

            bill.Status = "Paid";


            var transactions = new List<TransactionViewModel>();
            foreach (var item in bill.BillTranItems)
            {

                var transaction = new TransactionViewModel
                {
                    AccountFromId = bill.Type == "Income" ? bill.Vendor.AccountId ?? 0 : bill.Vendor.PaymentAccount,
                    AccountToId = bill.Type == "Income" ? bill.Vendor.PaymentAccount : bill.Vendor.AccountId ?? 0,
                    Amount = item.Amount,
                    Narration = $"Bill payment for {bill.BillNo} Item {item.Description}",
                    TransactionDate = DateTime.Now,
                    TranReference = bill.BillNo
                };
                transactions.Add(transaction);
            }

            var recordTransactionTasks = transactions.Select(t => _transactionRepository.RecordTransactionAsync(t));
            await Task.WhenAll(recordTransactionTasks);

            await _context.SaveChangesAsync();

            return bill.Type == "Income" ? "Invoice" : "Bill";
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

        public async Task<BillViewModel> GetBillById(int id)
        {
            //get bill by id
            var bills = await _context.Bills
                .Include(b => b.BillTranItems)
                .Include(b => b.Vendor)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (bills == null)
                throw new ArgumentException("No bill found with that id");

            //map bill to billviewModel
            var billviewmodel = new BillViewModel
            {
                Id = bills.Id,
                BillDate = bills.BillDate,
                DueDate = bills.DueDate,
                BillNo = bills.BillNo,
                BillTranItems = bills.BillTranItems,
                TotalAmount = bills.TotalAmount,
                Type = bills.Type,
                Narration = bills.Narration,
                Status = bills.Status,
                Vendor = bills.Vendor
            };
            return billviewmodel;
        }

        public async Task UpdateBill(Bill bill)
        {
            var existingBill = await _context.Bills.FirstOrDefaultAsync(b => b.Id == bill.Id);
            if (existingBill == null)
                throw new ArgumentException("No bill found with that id");

            await ValidateBillType(bill.Type);
            ValidateBillStatus(bill.Status);

            await ValidateVendorAsync(bill.VendorId);

            await ValidateTransactionItemsAsync(bill.BillTranItems);

            _context.Entry(existingBill).CurrentValues.SetValues(bill);//.Update(bill);
            await _context.SaveChangesAsync();
        }
    }
}
