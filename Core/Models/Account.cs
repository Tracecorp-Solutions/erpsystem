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

        public string AccountType { get; set; }

        public string? AccountNumber { get; set; }

        //foreign key
        [ForeignKey("SubGroupAccount")]
        public int SubGroupAccountId { get; set; }
        [JsonIgnore]
        public SubGroupAccount? SubGroupAccount { get; set; } // Links to SubGroupAccount for grouping
        public string Description { get; set; }

        [NotMapped]
        public DateTime OpeningBalanceDate { get; set; }
    }

}
