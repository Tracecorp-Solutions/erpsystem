using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class ConnectedCustomerDto
    {
        public string CustomerRef { get; set; }
        public string FullName { get; set; }

        public string ApplicationNo { get; set; }
        public string Balance { get; set; }
        public DateOnly DateConnected { get; set; }
    }
}
