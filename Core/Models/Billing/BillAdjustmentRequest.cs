using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class BillAdjustmentRequest
    {
        public int Id { get; set; }
        public string CustRef { get; set; }
        public string DocumentNumber { get; set; }
        public string AdjustmentType { get; set; }

        public string AdjustmentReason { get; set; }
        public string AdjustmentStatus { get; set; }
        public string EvidenceFilePath { get; set; }

        public string TransactionCode { get; set; }

        public DateTime EffectiveDate { get; set; }

        public Decimal Amount { get;set; }

    }
}
