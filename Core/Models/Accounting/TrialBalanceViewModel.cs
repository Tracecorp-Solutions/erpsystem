using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Accounting
{
    public class TrialBalanceViewModel
    {
        public string GroupName { get; set; }
        public string SubGroupName { get; set; }
        public string AccountType { get; set; }
        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public decimal Balance { get; set; }
    }
}
