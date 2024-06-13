using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class BillTranItems
    {
        public int? Id { get; set; }
        public int AccountId { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
    }
}
