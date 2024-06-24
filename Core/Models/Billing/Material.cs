using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class Material
    {
        public int MaterialId { get; set; }
        public string MaterialName { get; set; }
        public string MaterialDescription { get; set; }
        public decimal MaterialPrice { get; set; }
        public int MaterialQuantity { get; set; }

    }
}
