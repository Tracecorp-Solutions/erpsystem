using Core.Models.Billing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.CRM
{
    public class Ticket
    {
        public int Id { get; set; }
        public string CustomerType { get; set; }
        public string? CustomerRef { get; set; }
        public string CustomerName { get; set; }

        [ForeignKey("OperationArea")]
        public int OperationAreaId { get; set; }

        [ForeignKey("Branch")]
        public int BranchId { get; set; }

        [ForeignKey("Territory")]
        public int TerritoryId { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string ComplaintSubject { get; set; }

        [ForeignKey("Department")]
        public int AssignedTo { get; set; }

        [ForeignKey("TicketCategory")]
        public int TicketCategoryId { get; set; }
        public string TicketSource {  get; set; }

        [ForeignKey("Priority")]
        public int PriorityId { get; set; }
        public string Description { get; set; }
        public string Status {  get; set; }
        public DateTime CreationDate { get; set; }

        [ForeignKey("EscalationMatrix")]
        public int EscalationMatrixId { get; set; }

        public virtual Priority Priority { get; set; }
        public virtual TicketCategory TicketCategory { get; set; }
        public virtual Territory Territory { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual OperationArea OperationArea { get; set; }
        public virtual EscalationMatrix EscalationMatrix { get; set; }
        public virtual Department Department { get; set; }
    }
}
