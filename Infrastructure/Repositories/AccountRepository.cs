using Core.Models;
using Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
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
            var groupAccount = await _context.GroupAccounts.FindAsync(account.SubGroupAccountId);
            if (groupAccount == null)
                throw new ArgumentException("Invalid group account id.");

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return account;
        }

        public async Task<IEnumerable<Account>> GetAccounts() 
        {
            IEnumerable<Account> accounts = await _context.Accounts.ToListAsync();
            return accounts;
        }
    }
}
