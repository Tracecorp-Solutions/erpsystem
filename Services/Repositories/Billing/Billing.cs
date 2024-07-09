using Core.DTOs.Billing;
using Core.Models.Billing;
using Core.Repositories.Billing;
using Core.Repositories.Settings;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
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

        private readonly ISettings _settings;

        public Billing(ApplicationDbContext context, ISettings settings)
        {
            _context = context;
            _settings = settings;
        }

        public async Task AddBillingRequest(BillingRequest billingRequest)
        {
            await _context.BillingRequests.AddAsync(billingRequest);
            await _context.SaveChangesAsync();
        }

        public async Task<CustomerBill> BillCustomer(BillWaterCustomerDto dto)
        {
            // Get customer details based on customer ref
            var customer = await _context.BillingCustomers
                .Include(x => x.CustomerTarrif)
                .FirstOrDefaultAsync(x => x.CustomerRef == dto.CustomerRef);

            if (customer == null)
            {
                throw new Exception("Customer not found");
            }

            // Get previous reading for customer
            var readings = await _context.MeterReadings
                .Where(x => x.CustomerRef == dto.CustomerRef)
                .OrderByDescending(x => x.Id)
                .FirstOrDefaultAsync();

            if (readings == null)
            {
                throw new Exception("No previous reading found");
            }

            var consumption = readings.Reading - readings.PreviousReading;
            var cons = consumption * customer.CustomerTarrif.TarrifAmount;

            // Get total payment amount for customer greater than bill from date
            var totalAmountPaid = await _context.Payments
                .Where(x => x.CustomerRef == customer.CustomerRef && DateOnly.FromDateTime(x.PaymentDate) >= dto.BillFrom)
                .SumAsync(x => x.Amount);

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

            return bill;
        }

        public async Task<IEnumerable<CustomerBill>> GetCustomerBillsByCustRef(string custRef)
        {
            var bills = await _context.CustomerBills
                .Include(x => x.Customer)
                    .ThenInclude(c => c.CustomerTarrif)
                .Include(x => x.Customer)
                    .ThenInclude(c => c.Application)
                .Where(x => x.Customer.CustomerRef == custRef)
                .ToListAsync();

            if (bills == null || bills.Count == 0)
            {
                throw new ArgumentException("No Customer Bill found for the given customer reference.");
            }

            return bills;
        }

        public async Task<IEnumerable<CustomerBill>> GetCustomerBills()
        {
            var bills = await _context.CustomerBills
                .Include(x => x.Customer)
                    .ThenInclude(c => c.CustomerTarrif)
                .Include(x => x.Customer)
                    .ThenInclude(c => c.Application)
                .ToListAsync();

            if (bills == null || bills.Count == 0)
            {
                throw new ArgumentException("No Customer Bill found.");
            }

            return bills;
        }

        public async Task AddBillAdjustmentRequest(IFormFile file, BillAdjustmentRequestDto billAdjustmentRequest)
        {

            //check whether file is uploaded
            if (file == null)
                throw new Exception("Evidence file is required");

            //check adjustment type
            if (billAdjustmentRequest.AdjustmentType != "+" && billAdjustmentRequest.AdjustmentType != "-")
                throw new Exception("Invalid Adjustment Type. Type should be a + or -");

            //save file to disk
            string filepath = await _settings.SaveFileAndReturnPathAsync(file);

            var billAdjustment = new BillAdjustmentRequest
            {
                CustRef = billAdjustmentRequest.CustRef,
                DocumentNumber = billAdjustmentRequest.DocumentNumber,
                AdjustmentType = billAdjustmentRequest.AdjustmentType,
                AdjustmentReason = billAdjustmentRequest.AdjustmentReason,
                AdjustmentStatus = "PENDING",
                EvidenceFilePath = filepath,
                TransactionCode = billAdjustmentRequest.TransactionCode,
                EffectiveDate = billAdjustmentRequest.EffectiveDate,
                Amount = billAdjustmentRequest.Amount
            };

            await _context.BillAdjustmentRequests.AddAsync(billAdjustment);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<BillAdjustmentRequest>> GetBillAdjustmentRequests()
        {
            var billAdjustments = await _context.BillAdjustmentRequests.ToListAsync();

            if (billAdjustments == null || billAdjustments.Count == 0)
            {
                throw new ArgumentException("No Bill Adjustment Request found.");
            }

            return billAdjustments;
        }

        public async Task<BillAdjustmentRequest> GetBillAdjustmentRequestById(int id)
        {
            var billAdjustment = await _context.BillAdjustmentRequests.FirstOrDefaultAsync(x => x.Id == id);

            if (billAdjustment == null)
            {
                throw new ArgumentException("Bill Adjustment Request not found.");
            }

            return billAdjustment;
        }

        public async Task AddBillingPeriod(BillingPeriodDto billingPeriod)
        {
            var period = new BillingPeriod
            {
                Name = billingPeriod.Name,
                StartDate = billingPeriod.StartDate,
                EndDate = billingPeriod.EndDate,
                IsCompleted = false,
                Period = billingPeriod.Period,
                
            };

            await _context.BillingPeriod.AddAsync(period);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<BillingPeriod>> GetBillingPeriods()
        {
            var periods = await _context.BillingPeriod.ToListAsync();

            if (periods == null || periods.Count == 0)
            {
                throw new ArgumentException("No Billing Period found.");
            }

            return periods;
        }


    }
}
