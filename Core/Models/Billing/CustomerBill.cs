using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class CustomerBill
    {
        public int CustomerBillId { get; set; }

        [ForeignKey("BillingCustomer")]
        public int CustomerId { get; set; }
        public DateTime BillDate { get; set; }
        public int BillPeriod { get; set; }
        public int PreviousReading { get; set; }
        public int CurrentReading { get; set; }
        public int consuption { get; set; }
        public decimal TotalBillAmount { get; set; }
        public decimal TotalAmountPaid { get; set; }
        public decimal DueAmount { get; set; }
        public virtual BillingCustomer Customer { get; set; }
    }
}
