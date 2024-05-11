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
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationDbContext _context;

        public AccountRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Account> CreateAccountAsync(Account account)
        {
            var groupAccount = await _context.SubGroupAccounts.FindAsync(account.SubGroupAccountId);
            if (groupAccount == null)
                throw new ArgumentException("Invalid subgroup account id.");

            // Check if the AccountType is provided is valid
            if (account.AccountType !="InHouse" && account.AccountType !="Bank")
                throw new ArgumentException("Please Account type should be InHouse or Bank");

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            await CreditAccountWithBalance(account.Id,account.Balance,account.OpeningBalanceDate);
            return account;
        }
        public async Task<IEnumerable<Account>> GetAccounts()
        {
            // Only retrieve the accounts if they exist
            var accounts =  await _context.Accounts.ToListAsync();

            return accounts == null ? throw new ArgumentException("No Account found"): accounts;
        }

        public async Task<decimal> GetAccountBalance(int accountId) 
        {
            var debitTotal = await _context.transactionEntries
            .Where(t => t.TranAccount == accountId && t.TransactionType == "Debit")
            .SumAsync(t => t.Amount);

            var creditTotal = await _context.transactionEntries
                .Where(t => t.TranAccount == accountId && t.TransactionType == "Credit")
                .SumAsync(t => t.Amount);

            return creditTotal - debitTotal;
        }

        public async Task<Account> GetAccountById(int accountId) 
        {
            var account = await _context.Accounts
                .Include(ac => ac.SubGroupAccount)
                .FirstOrDefaultAsync(ac => ac.Id == accountId);

            return account == null ? throw new ArgumentException("No Account Found with that id") : account;
        }

        public async Task<string> UpdateAccount(Account account) 
        {
            //get existing account
            var exisitingac = await _context.Accounts
                .FirstOrDefaultAsync(ac => ac.Id == account.Id);
            if (exisitingac == null)
                throw new ArgumentException("No Account found with this id");

            _context.Entry(exisitingac).CurrentValues.SetValues(account);
            await _context.SaveChangesAsync();
            return "Account Updated successfully";
        }

        public async Task<IEnumerable<Account>> GetAccountsBySubGroupId(int subGroupId) 
        {
            var accounts = await _context.Accounts
                .Where(ac => ac.SubGroupAccountId == subGroupId).ToListAsync();
            return accounts == null ? throw new ArgumentException("No Account found in that subgroup") : accounts;
        }

        private async Task CreditAccountWithBalance(int accountId,decimal Amount, DateTime TransactionDate)
        {
            var creditEntry = new TransactionEntry 
            {
                TranAccount = accountId,
                TransactionType ="Credit",
                Amount = Amount,
                TransactionDate = TransactionDate,
                TransactionReference = "Balance B/f",
                Narration= "Balance B/f"

            };
            _context.transactionEntries.Add(creditEntry);
            await _context.SaveChangesAsync(); }

    }
}
