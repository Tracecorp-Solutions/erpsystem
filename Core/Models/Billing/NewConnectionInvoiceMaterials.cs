using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class NewConnectionInvoiceMaterials
    {
        public int Id { get; set; }

        public int NewConnectionInvoiceId { get; set; }

        public int MaterialId { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}
