using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class ValidateCustomerDto
    {
        public string Name { get; set; }
        public decimal Balance { get; set; }

        public string ApplicationNo { get; set; }
        public string CustomerRef { get; set; }
        public string CustomerName { get; set; }
        public string MeterNumber { get; set; }
        public string Tariff { get; set; }
        public string PreviousReading { get; set; }

    }
}
