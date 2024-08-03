﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.CRM
{
    public class UpdateTicketDto
    {
        public int Id { get; set; }
        public string CustomerType { get; set; }
        public string? CustomerRef { get; set; }
        public string CustomerName { get; set; }
        public int OperationAreaId { get; set; }
        public int BranchId { get; set; }
        public int TerritoryId { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string ComplaintSubject { get; set; }
        public int AssignedTo { get; set; }
        public int TicketCategoryId { get; set; }
        public string TicketSource { get; set; }
        public int PriorityId { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime CreationDate { get; set; }
        public int EscalationMatrixId { get; set; }
    }
}
