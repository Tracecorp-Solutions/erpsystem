using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Core.Models.Accounting
{
    public class TransactionEntry
    {
        public int Id { get; set; }

        [ForeignKey("Account")]
        public int TranAccount { get; set; }
        [JsonIgnore]
        public Account? Account { get; set; }
        public string TransactionType { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionReference { get; set; }
        public string Narration { get; set; }

        public DateTime RecordDate { get; set; }
    }
}
