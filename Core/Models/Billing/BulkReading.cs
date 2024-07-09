using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class BulkReading
    {
        public int Id { get; set; }

        [ForeignKey("OperationArea")]
        public int OperationAreaId { get; set; }

        [ForeignKey("Branch")]
        public int BranchId { get; set; }

        [ForeignKey("BillingRequest")]
        public int BillingCycleId { get; set; }
        public DateTime ReadingDate { get; set; }

        public int MeterReaderId { get; set; }

        public string filelocation { get; set; }

        public OperationArea OperationArea { get; set; }

        public Branch Branch { get; set; }

        public BillingRequest BillingRequest { get; set; }
    }
}
