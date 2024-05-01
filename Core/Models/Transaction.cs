using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("AccountFrom")]
        public int AccountFromId { get; set; }
        public Account AccountFrom { get; set; }  // Debit - Money taken from this account

        [ForeignKey("AccountTo")]
        public int AccountToId { get; set; }
        public Account AccountTo { get; set; }    // Credit - Money added to this account
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
        public string Narration { get; set; }
    }
}
