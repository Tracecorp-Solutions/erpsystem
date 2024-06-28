using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTOs.Billing;
using Core.Models.Billing;
using Core.Repositories.Billing;
using Infrastructure.Data;

namespace Services.Repositories.Billing
{
    public class CustomerPayment : ICustomerPayments
    {

        private readonly ApplicationDbContext _context;
        
        public CustomerPayment(ApplicationDbContext context) { _context = context; }

        public async Task AddPayments(PaymentDto pyt) 
        {
            //validate whether invoice exists in the database
            var invoice = _context.NewConnectionInvoices.FirstOrDefault(x => x.InvoiceNumber == pyt.CustomerRef);

            if (invoice == null)
                throw new ArgumentException("Reference cannot be found");

            //map dto to model
            var payment = new Payment
            {
                CustomerRef = pyt.CustomerRef,
                PaymntReference = pyt.PaymntReference,
                Vendor = pyt.Vendor,
                Amount = pyt.Amount,
                PaymentDate = pyt.PaymentDate,
                PaymentMethod = pyt.PaymentMethod,
                Narration = pyt.Narration
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
        }
    }
}
