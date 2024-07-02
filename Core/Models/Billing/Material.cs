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

        public decimal MaterialUnitPrice { get; set; }
        public string UnitOfMeasure { get; set; }

        public bool Invoiceable { get; set; }
        public string? MaterialDescription { get; set; }

    }
}
