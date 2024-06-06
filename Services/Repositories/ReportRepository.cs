using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Repositories;
using Core.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Services.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ITransactionRepository _transactionRepository;

        public ReportRepository(ApplicationDbContext context, ITransactionRepository transactionRepository)
        {
            _context = context;
            _transactionRepository = transactionRepository;
        }

        public async Task<AccountStatement> GetAccountStatement(int accountId, DateOnly startDate, DateOnly endDate)
        {
            // closing balance of the account as of the endDate and get all transactions grouped by the date using the account id and populate the AccountStatement object
            
            // get the closing balance of the account as of the endDate
            var closingBalance = await _transactionRepository.GetAccountBalanceAsOfThatDate(accountId, endDate);

            // get all transactions grouped by the date using the account id
            var transactions = await _transactionRepository.GetTransactionsByDateRange(startDate, endDate);
            // populate the AccountStatement object
            var accountStatement = new AccountStatement
            {
                AccountBalance = closingBalance.ToString("C"),
                accountStatementEntries = transactions
                    .GroupBy(t => t.TransactionDate)
                    .Select(g => new AccountStatementEntries
                    {
                        TransactionDate = DateOnly.FromDateTime(g.Key),
                        TransactionsFortheDay = g.Select(t => new TransactionsFortheDay
                        {
                            Description = t.Description,
                            Amount = t.Amount,
                            RunningBalance = t.RunningBalance
                        })
                    })
            };

            return accountStatement == null ? throw new ArgumentException("No account Statement for that Date Range"): accountStatement;
        }
    }
}
