using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Models.Accounting
{
    public class BillViewModel
    {
        public int? Id { get; set; }
        public DateTime BillDate { get; set; }
        public DateTime DueDate { get; set; }
        public string BillNo { get; set; }
        public List<BillTranItems> BillTranItems { get; set; }
        public decimal? TotalAmount { get; set; }

        public string Type { get; set; }

        public string? Narration { get; set; }

        public string Status { get; set; }
        public Vendor Vendor { get; set; }
    }
}
