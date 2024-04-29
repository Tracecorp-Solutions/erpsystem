using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Bill
    {
        public int? Id { get; set; }
        public DateTime BillDate { get; set; }
        public DateTime DueDate { get; set;}
        public string BillNo { get; set; }
        public List<BillTranItems> BillTranItems { get; set; }
        public decimal? TotalAmount { get; set; }

        public string Status { get; set; }

    }
}
