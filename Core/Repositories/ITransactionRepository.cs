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

        Task RecordJournalEntry(JournalItem item);

        Task<IEnumerable<TransactionsViewModel>> GetAllTransactions(); 

        Task<IEnumerable<TransactionsViewModel>> GetTransactionEntriesByAccountId(int accountId);
    }
}
