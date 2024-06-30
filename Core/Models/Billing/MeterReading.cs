using Core.Models.UserManagement;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class MeterReading
    {
        public int Id { get; set; }
        public string MeterNo { get; set; } // Meter Number

        public string CustomerRef { get; set; } // Customer Reference
        public DateOnly ReadingDate { get; set; } // Date of Reading
        public int Reading { get; set; } // Reading in Cubic Meter
        public int ReadingType { get; set; } // 1 = Normal, 2 = Reversed
        public int ReadingStatus { get; set; } // 1 = Active, 2 = PERIODIC, 3 = DISCONNECTED, 4 = RECONNECTED
        public int ReadingSource { get; set; } //  1 = Actual, 2 = Estimated
        public int ReadingReason { get; set; } // 1 = Normal, 2 = Leak, 3 = Tampered, 4 = Others

        [ForeignKey("User")]
        public int ReadingBy { get; set; } // 1 = Customer, 2 = Staff, 3 = Others

        public User User { get; set; }

    }
}
