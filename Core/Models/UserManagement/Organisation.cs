using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.UserManagement
{
    public class Organisation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? CountryOfOperation { get; set; }
        public string? Logo { get; set; }
    }
}
