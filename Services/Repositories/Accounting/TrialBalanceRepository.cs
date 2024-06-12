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
    public class TrialBalanceRepository : ITrialBalanceRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly AccountRepository _accountRepository;

        public TrialBalanceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public TrialBalanceRepository(AccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public async Task<IEnumerable<TrialBalanceEntry>> GenerateTrialBalance()
        {
            //Fetch all transaction entries. group them by the description and transaction type and generate trial balance including account names that where affected
            var trialBalance = await _context.transactionEntries
                .Include(entry => entry.Account)
                .Where(entry => entry.TransactionReference != "Balance B/f") // Filter out opening balance transactions
                .GroupBy(entry => new { Description = entry.Account != null ? entry.Account.Description : null, entry.TransactionType, entry.Account.Name })
                .Select(group => new TrialBalanceEntry
                {
                    Description = group.Key.Description,
                    DebitAccount = group.Key.TransactionType == "Debit" ? group.Key.Name : null,
                    CreditAccount = group.Key.TransactionType == "Credit" ? group.Key.Name : null,
                    DebitAmount = group.Key.TransactionType == "Debit" ? group.Sum(entry => entry.Amount) : 0,
                    CreditAmount = group.Key.TransactionType == "Credit" ? group.Sum(entry => entry.Amount) : 0
                })
                .ToListAsync();


            // Fetch all transactions entries and group them by transaction date and description
            //var trialBalance = await _context.transactionEntries
            //    .Include(entry => entry.Account)
            //    .Where(entry => entry.TransactionReference != "Balance B/f") // Filter out opening balance transactions
            //    .GroupBy(entry => new { entry.TransactionDate, Description = entry.Account != null ? entry.Account.Description : null })
            //    .Select(group => new TrialBalanceEntry
            //    {
            //        TranDate = group.Key.TransactionDate,
            //        Description = group.Key.Description,
            //        DebitAmount = group.Where(entry => entry.TransactionType == "Debit").Sum(entry => entry.Amount),
            //        CreditAmount = group.Where(entry => entry.TransactionType == "Credit").Sum(entry => entry.Amount)
            //    })
            //    .ToListAsync();

            //// Calculate total debits and credits
            //decimal totalDebits = trialBalance.Sum(entry => entry.DebitAmount);
            //decimal totalCredits = trialBalance.Sum(entry => entry.CreditAmount);

            //// Add a total entry to the trial balance   
            //trialBalance.Add(new TrialBalanceEntry
            //{
            //    Description = "Total",
            //    DebitAmount = totalDebits,
            //    CreditAmount = totalCredits
            //});

            return trialBalance == null ? throw new ArgumentException("No Transactions Found for a trial balance to be generated") : trialBalance;
        }

        public async Task<Dictionary<string, decimal>> GetTrialBalance()
        {
            var trialBalance = new Dictionary<string, decimal>();

            // Fetch all accounts with their balances and group behaviors
            var accounts = await _context.Accounts
                .Include(a => a.SubGroupAccount)
                .ThenInclude(s => s.GroupAccount)
                .ToListAsync();

            foreach (var account in accounts)
            {
                // Calculate the balance of the account based on transactions
                var balance = await _accountRepository.GetAccountBalance(account.Id);

                // Add the balance to the trial balance dictionary under the corresponding group account name
                var groupName = account.SubGroupAccount.GroupAccount.Name;
                if (!trialBalance.ContainsKey(groupName))
                {
                    trialBalance[groupName] = 0; // Initialize balance for the group account
                }
                trialBalance[groupName] += balance;
            }

            return trialBalance;
        }

    }
}
