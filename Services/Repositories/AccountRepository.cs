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

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return account;
        }
        public async Task<IEnumerable<Account>> GetAccounts()
        {
            // Only retrieve the accounts if they exist
            return await _context.Accounts.ToListAsync();
        }

        public async Task<decimal> GetAccountBalance(int accountId) 
        {
            var debitTotal = await _context.Transactions
            .Where(t => t.AccountFromId == accountId)
            .SumAsync(t => t.Amount);

            var creditTotal = await _context.Transactions
                .Where(t => t.AccountToId == accountId)
                .SumAsync(t => t.Amount);

            return creditTotal - debitTotal;
        }

    }
}
