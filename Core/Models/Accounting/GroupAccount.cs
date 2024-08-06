using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Core.Models.Accounting
{
    public class GroupAccount
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public string? GroupCode { get; set; }

        public string Behaviour { get; set; } // Debit or Credit

        public string Description { get; set; }

        // Navigation property
        [JsonIgnore]
        public ICollection<SubGroupAccount>? SubGroupAccounts { get; set; }
    }
}
