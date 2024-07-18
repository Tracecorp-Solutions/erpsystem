using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.CRM
{
    public class EscalationMatrix
    {
        public int Id { get; set; }
        public string LevelName { get; set; }
        public string LevelDescription { get; set; }
        [ForeignKey("Department")]
        public int DepartmentId { get; set; }
        public TimeSpan EscalationTime { get; set; }

        [ForeignKey("TicketCategory")]
        public int TicketCategoryId { get; set; }

        [ForeignKey("Priority")]
        public int PriorityId { get; set; }

        public virtual Department Department { get; set; }
        public virtual Priority Priority { get; set; }
        public virtual TicketCategory TicketCategory { get; set; }
    }
}
