using Core.DTOs.Accounting;
using Core.Models.Accounting;
using Core.Repositories.Accounting;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories.Accounting
{
    public class TransactionRepository : ITransactionRepository
    {

        private readonly ApplicationDbContext _context;
        private readonly IAccountRepository _accountRepository;
        private readonly IConfiguration _configuration;

        public TransactionRepository(ApplicationDbContext context, IAccountRepository accountRepository, IConfiguration configuration)
        {
            _context = context;
            _accountRepository = accountRepository;
            _configuration = configuration;
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

        public async Task<IEnumerable<TransactionsViewModel>> GetTransactionsByDateRange(DateOnly startDate, DateOnly endDate)
        {
            return await _context.transactionEntries
                .AsNoTracking()
                .Include(t => t.Account)
                .Where(t => DateOnly.FromDateTime(t.TransactionDate) >= startDate && DateOnly.FromDateTime(t.TransactionDate) <= endDate)
                .OrderByDescending(t => t.Id)
                .Select(t => new TransactionsViewModel
                {
                    Id = t.Id,
                    TransactionDate = t.TransactionDate,
                    Amount = t.Amount,
                    TransactionType = t.TransactionType,
                    TranAccount = t.Account.Name,
                    TransactionReference = t.TransactionReference,
                    Narration = t.Narration,
                    RunningBalance = GetRunningBalanceAsync(t.TranAccount, t.Id, t.RecordDate, _configuration).Result,
                    AccountCode = t.Account.AccountCode
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
            //if (_accountRepository.GetAccountBalance(accountFrom.Id).Result < amount)
            //{
            //    throw new InvalidOperationException("Insufficient funds in the source account.");
            //}
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
            var transactions = tan.Select(t => new TransactionsViewModel
            {
                Id = t.Id,
                TransactionDate = t.TransactionDate,
                Amount = t.Amount,
                TransactionType = t.TransactionType,
                TranAccount = t.Account.Name,
                TransactionReference = t.TransactionReference,
                Narration = t.Narration,
                AccountCode = t.Account.AccountCode
            });

            return transactions == null ? throw new ArgumentException("No Transactions Found") : transactions;
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
                RunningBalance = GetRunningBalance(t.TranAccount, t.Id, t.RecordDate),
                AccountCode = t.Account.AccountCode
            });

            return transaction == null ? throw new ArgumentException("No transaction found for that particular account") : transaction;
        }

        private string GetRunningBalance(int tranAccount, int id, DateTime dateTime)
        {
            var debitTotal = _context.transactionEntries
                .Where(t => t.TranAccount == tranAccount && t.TransactionType == "Debit" && t.Id <= id && t.TransactionDate <= dateTime)
                .Sum(t => t.Amount);

            var creditTotal = _context.transactionEntries
                .Where(t => t.TranAccount == tranAccount && t.TransactionType == "Credit" && t.Id <= id && t.TransactionDate <= dateTime)
                .Sum(t => t.Amount);

            return (creditTotal - debitTotal).ToString("C");
        }

        private async static Task<string> GetRunningBalanceAsync(int tranAccount, int id, DateTime dateTime, IConfiguration configuration)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnection");
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseMySql(connectionstring, ServerVersion.AutoDetect(connectionstring));

            await using var context = new ApplicationDbContext(optionsBuilder.Options);

            var debitTotal = await context.transactionEntries
                .Where(t => t.TranAccount == tranAccount && t.TransactionType == "Debit" && t.Id <= id && t.TransactionDate <= dateTime)
                .SumAsync(t => (decimal?)t.Amount) ?? 0;

            var creditTotal = await context.transactionEntries
                .Where(t => t.TranAccount == tranAccount && t.TransactionType == "Credit" && t.Id <= id && t.TransactionDate <= dateTime)
                .SumAsync(t => (decimal?)t.Amount) ?? 0;

            var runningBalance = creditTotal - debitTotal;

            return runningBalance.ToString("C", CultureInfo.CurrentCulture);
        }

        public async Task<decimal> GetAccountBalanceAsOfThatDate(int accountId, DateOnly date)
        {
            // get some of debits and credits for the account as of the date
            var debitTotal = await _context.transactionEntries
                .Where(t => t.TranAccount == accountId && t.TransactionType == "Debit" && DateOnly.FromDateTime(t.TransactionDate) <= date)
                .SumAsync(t => t.Amount);
            var creditTotal = await _context.transactionEntries
                .Where(t => t.TranAccount == accountId && t.TransactionType == "Credit" && DateOnly.FromDateTime(t.TransactionDate) <= date)
                .SumAsync(t => t.Amount);

            return creditTotal - debitTotal;
        }
    }
}
