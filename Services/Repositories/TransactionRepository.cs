﻿using Core;
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
        private readonly IAccountRepository _accountRepository;

        public TransactionRepository(ApplicationDbContext context, IAccountRepository accountRepository)
        {
            _context = context;
            _accountRepository = accountRepository;
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

        public async Task<IEnumerable<TransactionsViewModel>> GetTransactionsByDateRange(DateTime startDate, DateTime endDate)
        {
            return await _context.transactionEntries
                .AsNoTracking()
                .Include(t => t.Account)
                .Where(t => t.TransactionDate >= startDate && t.TransactionDate <= endDate)
                .OrderByDescending(t => t.Id)
                .Select(t => new TransactionsViewModel
                {
                    Id = t.Id,
                    TransactionDate = t.TransactionDate,
                    Amount = t.Amount,
                    TransactionType = t.TransactionType,
                    TranAccount = t.Account.Name,
                    TransactionReference = t.TransactionReference,
                    Narration = t.Narration
                })
                .ToListAsync();
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

            //get account balance of the source account
            if (_accountRepository.GetAccountBalance(accountFrom.Id).Result < amount)
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
                RecordDate = DateTime.Now
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

        public async Task<TransactionDto> GetTransactionDetails(int tranid) 
        {
            var trans = _context.transactionEntries
                .AsNoTracking()
                .Include(t => t.Account)
                .Where(t => t.Id == tranid)
                .OrderByDescending(t => t.Id)
                .ToListAsync();
                //.Select(t => new TransactionDto 
                //{
                //    AccountFrom = t.Account.Name,
                //    AccountTo = t.Account.Name,
                //    Amount = t.Amount,
                //    TransactionDate = t.TransactionDate,
                //    TransactionType = t.TransactionType,
                //    TransactionReference = t.TransactionReference,
                //    Narration = t.Narration
                //});

            var trandto = new TransactionDto { };
            return trandto;
        }


        public async Task<IEnumerable<TransactionsViewModel>> GetTransactionEntriesByAccountId(int accountId) 
        {
            var trans = await _context.transactionEntries
                .AsNoTracking()
                .Include(t => t.Account)
                .Where(t => t.TranAccount == accountId)
                .OrderByDescending(t => t.Id).ToListAsync();

            //map trans to TransactionsViewModel with running balance
            var transaction = trans.Select(t => new TransactionsViewModel 
            {
                Id = t.Id,
                TransactionDate = t.TransactionDate,
                Amount = t.Amount,
                TransactionType = t.TransactionType,
                TranAccount = t.Account.Name,
                TransactionReference = t.TransactionReference,
                Narration = t.Narration,
                RunningBalance = GetRunningBalance(t.TranAccount, t.Id, t.RecordDate)
            });

            return transaction == null? throw new ArgumentException("No transaction found for that particular account"): transaction; 
        }

        private string GetRunningBalance(int tranAccount, int id, DateTime dateTime)
        {
            var debitTotal = _context.transactionEntries
                .Where(t => t.TranAccount == tranAccount && t.TransactionType == "Debit" && t.Id <= id && t.TransactionDate<= dateTime)
                .Sum(t => t.Amount);

            var creditTotal = _context.transactionEntries
                .Where(t => t.TranAccount == tranAccount && t.TransactionType == "Credit" && t.Id <= id && t.TransactionDate <= dateTime)
                .Sum(t => t.Amount);

            return (creditTotal - debitTotal).ToString("C");
        }
    }
}
