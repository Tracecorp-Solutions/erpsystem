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

            // Validate whether invoice exists in the database
            var invoice = await _context.NewConnectionInvoices
                .Include(x => x.Application)
                .FirstOrDefaultAsync(x => x.InvoiceNumber == pyt.CustomerRef);

            if (invoice == null)
                throw new ArgumentException("Reference cannot be found");

            //update status of application
            var application = await _context.Applications
                .FirstOrDefaultAsync(x => x.Id == invoice.ApplicationId);
            if (application == null)
                throw new ArgumentException("Application not found");

            // Check whether Payment Reference exists
            bool paymentExists = await _context.Payments
                .AnyAsync(x => x.PaymntReference == pyt.PaymntReference);

            if (paymentExists)
                throw new ArgumentException("Payment Reference already exists");

            // Map dto to model
            var payment = new Payment
            {
                CustomerName = invoice.Application.FullName,
                CustomerRef = pyt.CustomerRef,
                PaymntReference = pyt.PaymntReference,
                Vendor = pyt.Vendor,
                Amount = pyt.Amount,
                PaymentDate = pyt.PaymentDate,
                PaymentMethod = pyt.PaymentMethod,
                Narration = pyt.Narration
            };

            // Check whether payment amount is greater than invoice amount
            var invoiceAmount = await _context.NewConnectionInvoiceMaterials
                .Where(x => x.NewConnectionInvoiceId == invoice.Id)
                .SumAsync(x => x.Price);

            if (payment.Amount >= invoiceAmount)
            {
                // Update invoice status to paid
                invoice.Status = "Paid";
                invoice.PaymentDate = payment.PaymentDate;

                //update status of application and log application log

                application.Status = "PENDING CONNECTION";
                await _context.ApplicationLogs.AddAsync(new ApplicationLog
                {
                    ApplicationNumber = application.ApplicationNumber,
                    Status = "PENDING CONNECTION",
                    Date = DateTime.Now
                });
            }

            _context.Payments.Add(payment);


            await _context.SaveChangesAsync();
        }


        public async Task<ValidateCustomerDto> ValidateCustomerDetails(string customeRef)
        {
            var invoice = await _context.NewConnectionInvoices
                .Include(x => x.NewConnectionInvoiceMaterials)
                .Include(x => x.Application)
                .FirstOrDefaultAsync(x => x.InvoiceNumber == customeRef);

            if (invoice == null)
                throw new ArgumentException("Reference cannot be found");

            return new ValidateCustomerDto
            {
                Name = invoice.Application.FullName,
                Balance =invoice.NewConnectionInvoiceMaterials.Sum(x => x.Price)
            };
        }

        public async Task<IEnumerable<PaymentDto>> GetAllPayments()
        {
            var payments = await _context.Payments.ToListAsync();

            if (payments == null)
                throw new ArgumentException("No payments found");

            return payments.Select(x => new PaymentDto
            {
                CustomerRef = x.CustomerRef,
                PaymntReference = x.PaymntReference,
                Vendor = x.Vendor,
                Amount = x.Amount,
                PaymentDate = x.PaymentDate,
                PaymentMethod = x.PaymentMethod,
                Narration = x.Narration,
                CustomerName = x.CustomerName
            });
        }
    }
}
