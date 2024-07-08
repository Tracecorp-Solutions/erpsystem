using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.UserManagement;

namespace Core.Models.Billing
{
    public class JobCard
    {
        public int Id { get; set; }
        public string JobCardNumber { get; set; }

        [ForeignKey("Application")]
        public int applicationId { get; set; }

        [ForeignKey("User")]
        public int AssignedUserId { get; set; }

        public string JobCardType { get; set; }
        public string Status { get; set; }
        public DateTime CreationDate { get; set; }

        public DateTime DateUpdated { get; set; }

        public Application? Application { get; set; }

        public User? User { get; set; }
    }
}
