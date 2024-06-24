using Core.DTOs;
using Core.Models.Accounting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Accounting
{
    public interface ITransactionRepository
    {
        Task RecordTransactionAsync(TransactionViewModel transaction);

        Task<IEnumerable<TransactionsViewModel>> GetAllTransactions();

        Task<IEnumerable<TransactionsViewModel>> GetTransactionEntriesByAccountId(int accountId);

        Task<IEnumerable<TransactionsViewModel>> GetTransactionsByDateRange(DateOnly startDate, DateOnly endDate);

        Task<TransactionDto> GetTransactionDetails(int tranid);
        Task<decimal> GetAccountBalanceAsOfThatDate(int accountId, DateOnly date);
    }
}
