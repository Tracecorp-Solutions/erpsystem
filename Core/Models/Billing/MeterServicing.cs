using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class NewMeterServicing
    {
        public int Id { get; set; }

        public string CustomerRef { get; set; }
        public string MeterNo { get; set; }

        public string MeterSize { get; set; }
        public string MeterType { get; set; }
        public string ServicingStatus { get; set; }
        public string ServicingReason { get; set; }
        public string ServicingBy { get; set; }
        public DateTime ServicingDate { get; set; }
    }
}
