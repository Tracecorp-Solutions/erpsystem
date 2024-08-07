using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Accounting
{
    public class TransactionsViewModel
    {
        public int Id { get; set; }
        public string TransactionReference { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Description { get; set; }
        public string TranAccount { get; set; }
        public decimal Amount { get; set; }
        public string AccountCode { get; set; }

        [NotMapped]
        public string RunningBalance { get; set; }
        public string TransactionType { get; set; }
        public string Narration { get; set; }
    }
}
