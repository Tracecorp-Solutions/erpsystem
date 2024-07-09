using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class BulkReadingDto
    {
        public int OperationAreaId { get; set; }
        public int BranchId { get; set; }
        public int BillingCycleId { get; set; }
        public DateTime ReadingDate { get; set; }

        public int MeterReaderId { get; set; }

        public string filelocation { get; set; }
    }
}
