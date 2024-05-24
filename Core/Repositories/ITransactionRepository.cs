using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface ITransactionRepository
    {
        Task RecordTransactionAsync(TransactionViewModel transaction);

        Task<IEnumerable<TransactionsViewModel>> GetAllTransactions(); 

        Task<IEnumerable<TransactionsViewModel>> GetTransactionEntriesByAccountId(int accountId);

        Task<IEnumerable<TransactionsViewModel>> GetTransactionsByDateRange(DateTime startDate, DateTime endDate);

        Task<TransactionDto> GetTransactionDetails(int tranid);
    }
}
