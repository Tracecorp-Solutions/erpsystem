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
    }
}
