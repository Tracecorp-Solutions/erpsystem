using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Accounting
{
    public class BillTranItems
    {
        public int? Id { get; set; }

        [ForeignKey("Account")]
        public int AccountId { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }

        public Account? Account { get; set; }
    }
}
