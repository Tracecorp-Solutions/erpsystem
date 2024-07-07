using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class Block
    {
        public int Id { get; set; }
        public string BlockName { get; set; }
        public string BlockCode { get; set; }
    }
}
