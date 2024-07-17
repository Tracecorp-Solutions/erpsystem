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

        [ForeignKey("Department")]
        public int DepartmentId { get; set; }
        public TimeSpan EscalationTime { get; set; }

        public virtual Department Department { get; set; }
    }
}
