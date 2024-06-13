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

            // Fetch all transactions entries and group them by transaction date and description
            var trialBalance = await _context.transactionEntries
                .Where(entry => entry.TransactionReference != "Balance B/f") // Filter out opening balance transactions
                .GroupBy(entry => new { entry.TransactionDate, Description = entry.Account != null ? entry.Account.Description : null })
                .Select(group => new TrialBalanceEntry
                {
                    TranDate = group.Key.TransactionDate,
                    Description = group.Key.Description,
                    DebitAccount = group.Where(entry => entry.TransactionType == "Debit").Sum(entry => entry.Amount),
                    CreditAccount = group.Where(entry => entry.TransactionType == "Credit").Sum(entry => entry.Amount)
                })
                .ToListAsync();

            // Calculate total debits and credits
            decimal totalDebits = trialBalance.Sum(entry => entry.DebitAccount);
            decimal totalCredits = trialBalance.Sum(entry => entry.CreditAccount);

            // Add a total entry to the trial balance   
            trialBalance.Add(new TrialBalanceEntry
            {
                Description = "Total",
                DebitAccount = totalDebits,
                CreditAccount = totalCredits
            });

            return trialBalance== null? throw new ArgumentException("No Transactions Found for a trial balance to be generated"): trialBalance;
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
