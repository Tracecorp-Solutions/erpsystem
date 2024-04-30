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
    public class TransactionRepository : ITransactionRepository
    {

        private readonly ApplicationDbContext _context;

        public TransactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task RecordTransactionAsync(Transaction transaction)
        {
            // Retrieve accounts involved in the transaction
            var accountFrom = await _context.Accounts.FindAsync(transaction.AccountFromId);
            var accountTo = await _context.Accounts.FindAsync(transaction.AccountToId);

            if (accountFrom == null || accountTo == null)
                throw new ArgumentException("Invalid account(s) specified.");

            // Perform double-entry bookkeeping
            accountFrom.Balance -= transaction.Amount;
            accountTo.Balance += transaction.Amount;

            await _context.Transactions.AddAsync(transaction);

            // Save changes to the database
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Transaction>> GetAllTransactions() 
        {
            IEnumerable<Transaction> transactions = await _context.Transactions.ToListAsync();

            return transactions;
        }

        public async Task RecordJournalEntry(JournalItem journalItem) 
        {
            // Retrieve accounts involved in the transaction
            var accountFrom = await _context.Accounts.FindAsync(journalItem.AccountFromId);
            var accountTo = await _context.Accounts.FindAsync(journalItem.AccountToId);

            if (accountFrom == null || accountTo == null)
                throw new ArgumentException("Invalid account(s) specified.");

            // Get SubGroup where the account falls under
            var fromaccountsubgroupaccount = await _context.SubGroupAccounts.FindAsync(accountFrom.SubGroupAccountId);
            var toaccountsubgroupaccount = await _context.SubGroupAccounts.FindAsync(accountTo.SubGroupAccountId);

            var fromsgroup = await _context.GroupAccounts.FindAsync(fromaccountsubgroupaccount.GroupId);
            var togroup = await _context.GroupAccounts.FindAsync(toaccountsubgroupaccount.GroupId);
            //updating of balance for the accounts
            if (fromsgroup.Behaviour.Equals("Debit"))
            {
                accountFrom.Balance -= journalItem.Amount;
                accountTo.Balance += journalItem.Amount;
            }
            else
            {
                accountFrom.Balance += journalItem.Amount;
                accountTo.Balance -= journalItem.Amount;
            }

            await _context.SaveChangesAsync();
        }
    }
}
