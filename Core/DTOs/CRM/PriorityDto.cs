using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.CRM
{
    public class PriorityDto
    {
        public int? Id { get; set; }
        public string PriorityName { get; set; }
        public string ColorCode { get; set; }
        public string PriorityDescription { get; set; }
    }
}
