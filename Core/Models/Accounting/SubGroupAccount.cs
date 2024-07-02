using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Core.Models.Accounting
{
    public class SubGroupAccount
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        //foreign key
        [ForeignKey("GroupAccount")]
        public int GroupId { get; set; }

        public DateTime? DateCreated { get; set; }

        // Navigation property
        [JsonIgnore]
        public GroupAccount? GroupAccount { get; set; }
        [JsonIgnore]
        public ICollection<Account>? Accounts { get; set; }
    }
}
