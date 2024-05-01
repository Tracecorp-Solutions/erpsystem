using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Core.Models
{
    public class GroupAccount
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public string Behaviour { get; set; } // Debit or Credit

        // Navigation property
        [JsonIgnore]
        public ICollection<SubGroupAccount> SubGroupAccounts { get; set; }
    }
}
