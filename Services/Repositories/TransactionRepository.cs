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
                    var accountFrom = await GetAccountWithGroupAsync(transView.AccountFromId);
                    var accountTo = await GetAccountWithGroupAsync(transView.AccountToId);

                    ValidateAccounts(accountFrom, accountTo, transView.Amount);

                    var debitTransactionEntry = CreateTransactionEntry(transView, accountFrom.Id, "Debit");
                    var creditTransactionEntry = CreateTransactionEntry(transView, accountTo.Id, "Credit");

                    _context.transactionEntries.AddRange(new[] { debitTransactionEntry, creditTransactionEntry });
                    await _context.SaveChangesAsync();

                    await trans.CommitAsync();
                }
                catch
                {
                    await trans.RollbackAsync();
                    throw;
                }
            }
        }

        private async Task<Account> GetAccountWithGroupAsync(int accountId)
        {
            return await _context.Accounts
                .Include(a => a.SubGroupAccount)
                .ThenInclude(s => s.GroupAccount)
                .SingleOrDefaultAsync(a => a.Id == accountId);
        }

        private void ValidateAccounts(Account accountFrom, Account accountTo, decimal amount)
        {
            if (accountFrom == null || accountTo == null)
            {
                throw new ArgumentException("One or both accounts not found.");
            }

            if (accountFrom.SubGroupAccount.GroupAccount.Behaviour != "Debit")
            {
                throw new InvalidOperationException("The source account must belong to a group with 'Debit' behavior.");
            }

            if (accountTo.SubGroupAccount.GroupAccount.Behaviour != "Credit")
            {
                throw new InvalidOperationException("The destination account must belong to a group with 'Credit' behavior.");
            }

            if (accountFrom.Balance < amount)
            {
                throw new InvalidOperationException("Insufficient funds in the source account.");
            }
        }

        private TransactionEntry CreateTransactionEntry(TransactionViewModel transView, int accountId, string transactionType)
        {
            return new TransactionEntry
            {
                TransactionDate = transView.TransactionDate,
                Amount = transView.Amount,
                TransactionType = transactionType,
                TranAccount = accountId,
                TransactionReference = transView.TranReference,
                Narration = transView.Narration,
            };
        }

        public async Task<IEnumerable<TransactionsViewModel>> GetAllTransactions() 
        {
            //get all transactions with the corresponding accounts  and order the, by transaction id in descending order


            var tan = await _context.transactionEntries
                .Include(t => t.Account).OrderByDescending(t => t.Id)
                .ToListAsync();

            // map the transactions to the transaction view model
            var transactions =  tan.Select(t => new TransactionsViewModel
            {
                Id = t.Id,
                TransactionDate = t.TransactionDate,
                Amount = t.Amount,
                TransactionType = t.TransactionType,
                TranAccount = t.Account.Name,
                TransactionReference = t.TransactionReference,
                Narration = t.Narration
            });

            return transactions == null? throw new ArgumentException("No Transactions Found") : transactions;
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


        public async Task<IEnumerable<TransactionsViewModel>> GetTransactionEntriesByAccountId(int accountId) 
        {
            var trans = await _context.transactionEntries
                .Include(t => t.Account)
                .Where(t => t.TranAccount == accountId)
                .OrderByDescending(t => t.Id).ToListAsync();

            //map trans to TransactionsViewModel
            var transaction = trans.Select(t => new TransactionsViewModel 
            {
                Id = t.Id,
                TransactionDate = t.TransactionDate,
                Amount = t.Amount,
                TransactionType = t.TransactionType,
                TranAccount = t.Account.Name,
                TransactionReference = t.TransactionReference,
                Narration = t.Narration
            });

            return transaction == null? throw new ArgumentException("No transaction found for that particular account"): transaction; 
        }
    }
}
