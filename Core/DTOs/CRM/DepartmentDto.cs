using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.CRM
{
    public class DepartmentDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int HeadDepactId { get; set; }
    }
}
