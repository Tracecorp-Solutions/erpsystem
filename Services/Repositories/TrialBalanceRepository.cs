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

        public TrialBalanceRepository(ApplicationDbContext context)
        {
            _context = context;
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
                var balance = await CalculateAccountBalance(account.Id);

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

        private async Task<decimal> CalculateAccountBalance(int accountId)
        {
            // Calculate the sum of credits and debits for the given account
            var creditTotal = await _context.Transactions
                .Where(t => t.AccountToId == accountId)
                .SumAsync(t => t.Amount);

            var debitTotal = await _context.Transactions
                .Where(t => t.AccountFromId == accountId)
                .SumAsync(t => t.Amount);

            // Calculate the balance by subtracting debits from credits
            return creditTotal - debitTotal;
        }

    }
}
