using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Vendor
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? CompanyName { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Website { get; set; }
        public Address Addres { get; set; }
        public string AccountNo { get; set; }
        public decimal BillingRate { get; set; }
        public decimal OpeningBalance { get; set; }
        public DateTime OpeningBalanceDate { get; set; }
        public string Notes { get; set; }
        public string BusinessIdNo { get; set; }
        public bool Status { get; set; }
        public int? AccountId { get; set; }

        [ForeignKey("Account")]
        public int PaymentAccount { get; set;}
        [NotMapped]
        public int SubGroupId { get; set; }

        [JsonIgnore]
        public Account Account { get; set; }
        public string VendorType { get; set; }
    }

}
