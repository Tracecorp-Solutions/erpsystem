using Core.Models.Accounting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Accounting
{
    public interface IAccountRepository
    {
        Task<Account> CreateAccountAsync(Account account);
        Task<IEnumerable<Account>> GetAccounts();

        Task<decimal> GetAccountBalance(int accountId);

        Task<Account> GetAccountById(int accountId);

        Task<string> UpdateAccount(Account account);

        Task<IEnumerable<Account>> GetAccountsBySubGroupId(int subGroupId);
    }
}
