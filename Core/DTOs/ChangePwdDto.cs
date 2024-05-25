using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class ChangePwdDto
    {
        public string Username { get; set; }
        public string NewPassord { get; set; }
        public string RepeatPassword { get; set; }

    }
}
