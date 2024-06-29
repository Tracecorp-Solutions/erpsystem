using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class NewConnectionInvoiceMaterials
    {
        public int Id { get; set; }

        [ForeignKey("NewConnectionInvoice")]
        public int NewConnectionInvoiceId { get; set; }

        [ForeignKey("Material")]
        public int MaterialId { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }


        public virtual NewConnectionInvoice NewConnectionInvoice { get; set; }

        public virtual Material Material { get; set; }
    }
}
