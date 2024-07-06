using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class BlockDto
    {
        public string BlockName { get; set; }

        public string BlockCode { get; set; }
        public int BranchId { get; set; }
        public int TerritoryId { get; set; }
        public int SubTerritoryId { get; set; }
        public int OperationAreaId { get; set; }
    }
}
