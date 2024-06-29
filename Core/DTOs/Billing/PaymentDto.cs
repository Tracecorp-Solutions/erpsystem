using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class PaymentDto
    {
        public string CustomerRef { get; set; }
        public string PaymntReference { get; set; }

        public string Vendor { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentMethod { get; set; }
        public string Narration { get; set; }

        public string CustomerName { get; set; }
    }
}
