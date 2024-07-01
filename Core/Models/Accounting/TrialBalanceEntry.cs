using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Accounting
{
    public class TrialBalanceEntry
    {
        public DateTime TranDate { get; set; }
        public string? Description { get; set; }
        public string DebitAccount { get; set; }
        public string CreditAccount { get; set; }

        public decimal DebitAmount { get; set; }
        public decimal CreditAmount { get; set; }
    }
}
