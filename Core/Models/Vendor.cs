using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Vendor
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Suffix { get; set; }
        public string Email { get; set; }
        public string Company { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Fax { get; set; }
        public string Other { get; set; }
        public string Website { get; set; }
        public Address Addres { get; set; }
        public decimal BillingRate { get; set; }
        public decimal OpeningBalance { get; set; }
        public DateTime OpeningBalanceDate { get; set; }
        public string Notes { get; set; }
        public string BusinessIdNo { get; set; }
        public string Status { get; set; }
        public int AccountId { get; set; }

    }
}
