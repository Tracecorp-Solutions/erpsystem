using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Territory
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [ForeignKey("Branch")]
        public int BranchId { get; set; }
        public Branch? Branch {  get; set; } 
    }
}
