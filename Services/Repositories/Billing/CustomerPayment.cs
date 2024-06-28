using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTOs.Billing;
using Core.Models.Billing;
using Core.Repositories.Billing;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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

            //check whether Payment Reference exists
            var paym = _context.Payments.FirstOrDefault(x => x.PaymntReference == pyt.PaymntReference);

            if (paym != null)
                throw new ArgumentException("Payment Reference already exists");

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

        public async Task<ValidateCustomerDto> ValidateCustomerDetails(string customeRef)
        {
            var invoice = await _context.NewConnectionInvoices.FirstOrDefaultAsync(x => x.InvoiceNumber == customeRef);

            if (invoice == null)
                throw new ArgumentException("Reference cannot be found");

            return new ValidateCustomerDto
            {
                Name = invoice.Application.FullName,
                Balance =invoice.NewConnectionInvoiceMaterials.Sum(x => x.Price)
            };
        }
    }
}
