using Core.Models;
using Core.Repositories;
using Infrastructure;
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
            // Directly use AnyAsync to check if any accounts exist
            if (!await _context.Accounts.AnyAsync())
            {
                throw new ArgumentException("No accounts found.");
            }

            // Only retrieve the accounts if they exist
            return await _context.Accounts.ToListAsync();
        }

    }
}
