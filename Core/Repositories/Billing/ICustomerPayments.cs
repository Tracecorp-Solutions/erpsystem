using Core.DTOs.Billing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Billing
{
    public interface ICustomerPayments
    {
        Task AddPayments(PaymentDto pyt);

        Task<ValidateCustomerDto> ValidateCustomerDetails(string customeRef);
    }
}
