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

        [ForeignKey("Branch")]
        public int BranchId { get; set; }

        [ForeignKey("Territory")]
        public int TerritoryId { get; set; }

        [ForeignKey("SubTerritory")]
        public int SubTerritoryId { get; set; }

        [ForeignKey("OperationArea")]
        public int OperationAreaId { get; set; }

        public virtual Branch Branch { get; set; }

        public virtual Territory Territory { get; set; }

        public virtual SubTerritory SubTerritory { get; set; }

        public virtual OperationArea OperationArea { get; set; }
    }
}
