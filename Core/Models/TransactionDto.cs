using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class TransactionDto
    {
        public string AccountFrom { get; set; }
        public string AccountTo { get; set; }

        public DateTime TransactionDate { get; set; }

        public decimal Amount { get; set; }
        public string Narration { get; set; }

        public string TranReference { get; set; }
    }
}
