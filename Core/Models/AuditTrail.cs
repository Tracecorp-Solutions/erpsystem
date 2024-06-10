using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Core.Models
{
    public class AuditTrail
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string Action { get; set; }
        public string Username { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
