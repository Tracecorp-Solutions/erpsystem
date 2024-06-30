using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class CustomerTarrif
    {
        public int Id { get; set; }
        public string TarrifName { get; set; }
        public string TarrifDescription { get; set; }
        public decimal TarrifAmount { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
