﻿using Core.Models.CRM;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.CRM
{
    public class EscatalationMatrixDto
    {
        public string LevelName { get; set; }
        public string LevelDescription { get; set; }
        public int DepartmentId { get; set; }

        public int TicketCategoryId { get; set; }

        public TimeSpan EscalationTime { get; set; }
        public int PriorityId { get; set; }

        public string NotificationType { get; set; }

        public int DepartmentLevel { get; set; }

        public string EmailTemplate { get; set; }
    }
}