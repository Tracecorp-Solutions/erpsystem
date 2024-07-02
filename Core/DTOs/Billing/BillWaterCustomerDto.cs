using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class BillWaterCustomerDto
    {
        public string CustomerRef { get; set; }
        public DateOnly BillFrom { get; set; }
        public DateOnly BillTo { get; set; }
    }
}
