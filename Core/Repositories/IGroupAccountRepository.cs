using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Repositories
{
    public interface IGroupAccountRepository
    {
        Task<GroupAccountView> AddAsync(GroupAccountView groupAccount);

        Task<SubGroupAccount> AddSubGroupAccount(SubGroupAccount subGroupAccount);

        Task<IEnumerable<GroupAccount>> GetAllGroupAccounts();

        Task<IEnumerable<GroupSubGroupViewModel>> GetAllSubGroupAccounts();

        Task<GroupAccount> GetGroupById(int id);
        Task UpdateGroupAccount(GroupAccount groupAccount);

        Task<SubGroupAccount> GetSubGroupById(int id);

        Task UpdateSubGroupAccount(SubGroupAccount subGroupAccount);
        Task<IEnumerable<SubGroupAccount>> GetSubGroupByGroupId(int groupId);
    }

}
