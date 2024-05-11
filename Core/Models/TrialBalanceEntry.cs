using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class TrialBalanceEntry
    {
        public DateTime TranDate { get; set; }
        public string? Description { get; set; }
        public decimal DebitAccount { get; set; }
        public decimal CreditAccount { get; set; }
    }
}
