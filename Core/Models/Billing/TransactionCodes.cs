using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class TransactionCodes
    {
        public int Id { get;set; }

        public string TransactionCode { get; set; }

        public string Description { get; set; }
    }
}
