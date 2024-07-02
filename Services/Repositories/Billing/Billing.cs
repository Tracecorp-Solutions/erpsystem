using Core.DTOs.Billing;
using Core.Models.Billing;
using Core.Repositories.Billing;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories.Billing
{
    public class Billing : IBilling
    {
        private readonly ApplicationDbContext _context;

        public Billing(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddBillingRequest(BillingRequest billingRequest)
        {
            await _context.BillingRequests.AddAsync(billingRequest);
            await _context.SaveChangesAsync();
        }

        public async Task BillCustomer(BillWaterCustomerDto dto)
        {
            //get customer details basing on customer ref
            var customer = _context.BillingCustomers
                .Include(x => x.CustomerTarrif)
                .FirstOrDefault(x => x.CustomerRef == dto.CustomerRef);

            if (customer == null)
                throw new Exception("Customer not found");

            //get previous reading for customer
            var readings = _context.MeterReadings.Where(x => x.CustomerRef == dto.CustomerRef).OrderByDescending(x => x.Id).FirstOrDefault();

            

            if (readings == null)
                throw new Exception("No previous reading found");

            var consumption = readings.Reading - readings.PreviousReading;  

            var cons = consumption * customer.CustomerTarrif.TarrifAmount;

            //get total payment amount for customer greater than bill from date
            var totalAmountPaid = _context.Payments.Where(x => x.CustomerRef == customer.CustomerRef && DateOnly.FromDateTime(x.PaymentDate) >= dto.BillFrom).Sum(x => x.Amount);

            var amtdue = cons - totalAmountPaid;

            var bill = new CustomerBill
            {
                CustomerId = customer.Id,
                BillDate = DateTime.Now,
                BillPeriod = 1,
                PreviousReading = readings.PreviousReading,
                CurrentReading = readings.Reading,
                consuption = consumption,
                TotalBillAmount = cons,
                TotalAmountPaid = totalAmountPaid,
                DueAmount = amtdue
            };

            await _context.CustomerBills.AddAsync(bill);
            await _context.SaveChangesAsync();
        }
    }
}
