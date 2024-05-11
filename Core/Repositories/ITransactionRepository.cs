﻿using Core.Models;
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

        Task<IEnumerable<TransactionEntry>> GetAllTransactions(); 

        Task<IEnumerable<TransactionEntry>> GetTransactionEntriesByAccountId(int accountId);
    }
}
