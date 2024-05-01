using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Core.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }

        //foreign key
        [ForeignKey("SubGroupAccount")]
        public int SubGroupAccountId { get; set; }
        [JsonIgnore]
        public SubGroupAccount? SubGroupAccount { get; set; } // Links to SubGroupAccount for grouping
        public string Description { get; set; }

        // Navigation properties for transactions
        [JsonIgnore]
        public ICollection<Transaction>? TransactionsFrom { get; set; } // Transactions where this account is the source (debit)
        [JsonIgnore]
        public ICollection<Transaction>? TransactionsTo { get; set; }   // Transactions where this account is the destination (credit)
    }
}
