using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class AuthorizeConnectionDto
    {
        public string ApplicationNumber {  get; set; }
        public int ConnectionType { get; set; }
        public int ConnectionCategory {  get; set; }
        public string AuthorizedBy { get; set; }

    }
}
