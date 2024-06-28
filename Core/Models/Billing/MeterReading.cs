using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class MeterReading
    {
        public int Id { get; set; }
        public int MeterNo { get; set; } // Meter Number
        public DateTime ReadingDate { get; set; } // Date of Reading
        public int Reading { get; set; } // Reading in Cubic Meter
        public int ReadingType { get; set; } // 1 = Normal, 2 = Reversed
        public int ReadingStatus { get; set; }
        public int ReadingSource { get; set; } //  1 = Actual, 2 = Estimated
        public int ReadingReason { get; set; } // 1 = Normal, 2 = Leak, 3 = Tampered, 4 = Others
        public int ReadingBy { get; set; } // 1 = Customer, 2 = Staff, 3 = Others
        public DateTime ReadingTime { get; set; } // Time of Reading

    }
}
