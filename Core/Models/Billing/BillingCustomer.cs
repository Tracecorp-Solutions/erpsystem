using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class BillingCustomer
    {
        public int Id { get; set; }
        public string CustomerRef { get; set; }

        [ForeignKey("Application")]
        public int ApplicationId { get; set; }

        [ForeignKey("CustomerTarrif")]
        public int TarrifId { get; set; }

        public DateTime DateConnected { get; set; }


        public virtual Application Application { get; set; }

        public virtual CustomerTarrif CustomerTarrif { get; set; }

    }
}
