using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class NewConnectionInvoice
    {
        public int Id { get; set; }

        public string InvoiceNumber { get; set; }

        [ForeignKey("Application")]
        public int ApplicationId { get; set; }

        public List<NewConnectionInvoiceMaterials> NewConnectionInvoiceMaterials { get; set; }  

        public DateTime InvoiceDate { get; set; }

        public virtual Application? Application { get; set; }

        public string Status { get; set; }
        public DateTime? PaymentDate { get; set; }
    }
}
