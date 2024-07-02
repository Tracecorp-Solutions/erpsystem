using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class CustomerTarrifDto
    {
        public string TarrifName { get; set; }
        public string TarrifDescription { get; set; }
        public decimal TarrifAmount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
