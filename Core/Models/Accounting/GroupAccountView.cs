using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Accounting
{
    public class GroupAccountView
    {
        public string Name { get; set; }

        public string Behaviour { get; set; } // Debit or Credit

        public string Description { get; set; }
    }
}
