using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTOs.Billing;

namespace Core.Repositories.Billing
{
    public interface IConnectedCustomersRepository
    {
        Task<IEnumerable<ConnectedCustomerDto>> GetConnectedCustomers();
    }
}
