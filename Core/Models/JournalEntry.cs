using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class JournalEntry
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string JournalDate { get; set; }
        public string Description { get; set; }
        public int PostedBy {  get; set; }
        public DateTime DateCreated { get; set;}

    }
}
