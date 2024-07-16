using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.CRM
{
    public class TicketCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [ForeignKey("Department")]
        public int DepartmentId { get; set; }

        public string Description { get; set; }

        public virtual Department Department { get; set; }
    }
}
