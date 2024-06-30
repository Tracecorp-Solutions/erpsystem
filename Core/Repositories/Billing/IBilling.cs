using Core.Models.Billing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Billing
{
    public interface IBilling
    {
        Task AddBillingRequest(BillingRequest billingRequest);
    }
}
