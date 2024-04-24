﻿using Core.Models;
using Core.Repositories;
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

        public async Task<Account> CreateAccountAsync(int groupId, Account account)
        {
            var groupAccount = await _context.GroupAccounts.FindAsync(groupId);
            if (groupAccount == null)
                throw new ArgumentException("Invalid group account id.");

            _context.Accounts.Add(account);
            //groupAccount.Accounts.Add(account);
            //groupAccount.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return account;
        }
    }
}
