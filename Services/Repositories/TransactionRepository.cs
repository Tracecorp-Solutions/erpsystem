using Core;
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

        public async Task RecordTransactionAsync(TransactionViewModel transView) 
        {
            using (var trans = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var accountFrom = await _context.Accounts
                    .Include(a => a.SubGroupAccount)
                    .ThenInclude(s => s.GroupAccount)
                    .SingleOrDefaultAsync(a => a.Id == transView.AccountFromId);

                    var accountTo = await _context.Accounts
                        .Include(a => a.SubGroupAccount)
                        .ThenInclude(s => s.GroupAccount)
                        .SingleOrDefaultAsync(a => a.Id == transView.AccountToId);

                    if (accountFrom == null || accountTo == null)
                        throw new ArgumentException("One or both accounts not found.");

                    if (accountFrom.SubGroupAccount.GroupAccount.Behaviour != "Debit")
                        throw new InvalidOperationException("The source account must belong to a group with 'Debit' behavior.");

                    //if (accountTo.SubGroupAccount.GroupAccount.Behaviour != "Credit")
                    //    throw new InvalidOperationException("The destination account must belong to a group with 'Credit' behavior.");

                    if (accountFrom.Balance < transView.Amount)
                        throw new InvalidOperationException("Insufficient funds in the source account.");

                    // Update account balances
                    accountFrom.Balance -= transView.Amount;
                    accountTo.Balance += transView.Amount;

                    // Create and save the transaction
                    var transactionEntry = new Transaction
                    {
                        AccountFromId = transView.AccountFromId,
                        AccountToId = transView.AccountToId,
                        Amount = transView.Amount,
                        TransactionDate = transView.TransactionDate,
                        Narration = transView.Narration
                    };

                    //update the database
                    _context.Transactions.Add(transactionEntry);
                    await _context.SaveChangesAsync();

                    // Commit transaction after all operations are successful
                    await trans.CommitAsync();
                }
                catch 
                {
                    // Rollback transaction if an exception occurs
                    await trans.RollbackAsync();
                    throw;
                }
            }
        }
        //public async Task RecordTransactionAsync(Transaction transaction)
        //{
        //    // Retrieve accounts involved in the transaction
        //    var accountFrom = await _context.Accounts.FindAsync(transaction.AccountFromId);
        //    var accountTo = await _context.Accounts.FindAsync(transaction.AccountToId);

        //    if (accountFrom == null || accountTo == null)
        //        throw new ArgumentException("Invalid account(s) specified.");

        //    // Perform double-entry bookkeeping

        //    //create Credit entry
        //    var creditTransaction = new Transaction
        //    {
        //        AccountFromId = accountTo.Id,
        //        AccountToId = accountFrom.Id,
        //        TransactionDate = transaction.TransactionDate,
        //        Amount = transaction.Amount,
        //        Narration = transaction.Narration,
        //    };

        //    //create Debit Entry
        //    var debitTransaction = new Transaction
        //    {
        //        AccountFromId = accountTo.Id,
        //        AccountToId = accountFrom.Id,
        //        TransactionDate = transaction.TransactionDate,
        //        Amount = -transaction.Amount,
        //        Narration = transaction.Narration,  
        //    };


        //    accountFrom.Balance -= transaction.Amount;
        //    accountTo.Balance += transaction.Amount;

        //    // Update database
        //    _context.Transactions.AddRange(new[] { debitTransaction, creditTransaction });
        //    await _context.SaveChangesAsync();
        //}

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
