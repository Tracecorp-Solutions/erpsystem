using Core.Models.UserManagement;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class MeterReadingDto
    {
        public string CustomerRef { get; set; } // Customer Reference
        public int MeterNo { get; set; } // Meter Number
        public int PreviousReading { get; set; }
        public DateOnly PreviousReadingDate { get; set; }
        public int Reading { get; set; } // Current meter reading
        public int ReadingType { get; set; } // 1 = Normal, 2 = Reversed
        public bool IsBilled { get; set; }
        public string ReadingSource { get; set; }
        public string ReadingReason { get; set; } // 1 = Normal, 2 = Leak, 3 = Tampered, 4 = Others
        public string ReadingStatus { get; set; } // 1 = Active, 2 = PERIODIC, 3 = DISCONNECTED, 4 = RECONNECTED
        public bool IsMeterReset { get; set; }
        public int ReadingBy { get; set; } // 1 = Customer, 2 = Staff, 3 = Others
        public DateTime ReadingDate { get; set; } // Date of Reading
    }
}
