using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class NewConnectionInvoiceDto
    {
        public int Id { get; set; }
        public string ApplicationNumber { get; set; }
        public DateTime Date { get; set; }

        public List<NewConnectionInvoiceMaterialsDto> materialsDtos { get; set; }


    }
}
