using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class BillingRequest
    {
        public int Id { get; set; }

        [ForeignKey("OperationArea")]
        public int OperationAreaId { get; set; }

        [ForeignKey("Branch")]
        public int BranchId { get; set; }
        public int BillingPeriodId { get; set; }
        public DateOnly ScheduledBillingDate { get; set; }
        public int Biller { get; set; }

        public OperationArea? OperationArea { get; set; }

        public Branch Branch { get; set; }
    }
}
