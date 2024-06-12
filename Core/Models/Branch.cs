using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Branch
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [ForeignKey("OperationArea")]
        public int OperationAreaId {  get; set; }

        public OperationArea? OperationArea { get; set; }
    }
}
