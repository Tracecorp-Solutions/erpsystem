﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class SubTerritory
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [ForeignKey("Territory")]
        public int TerritoryId { get; set; }

        private Territory? Territory { get; set; }
    }
}
