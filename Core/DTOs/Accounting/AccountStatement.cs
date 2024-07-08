using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Accounting
{
    public class AccountStatement
    {
        public string AccountBalance { get; set; }
        public IEnumerable<AccountStatementEntries> accountStatementEntries { get; set; }
    }

    public class AccountStatementEntries
    {
        public DateOnly TransactionDate { get; set; }
        public IEnumerable<TransactionsFortheDay> TransactionsFortheDay { get; set; }
    }
    public class TransactionsFortheDay
    {
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string RunningBalance { get; set; }
    }
}
