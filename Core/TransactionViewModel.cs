using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class TransactionViewModel
    {
        public int AccountFromId {  get; set; }
        public int AccountToId { get; set;}

        public DateTime TransactionDate {  get; set; }

        public decimal Amount { get; set; }
        public string Narration { get; set; }


    }
}
