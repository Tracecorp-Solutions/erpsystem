﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Repositories
{
    public interface IGroupAccountRepository
    {
        Task<GroupAccount> AddAsync(GroupAccount groupAccount);

        Task<SubGroupAccount> AddSubGroupAccount(SubGroupAccount subGroupAccount);

        Task<IEnumerable<GroupAccount>> GetAllGroupAccounts();

        Task<IEnumerable<SubGroupAccount>> GetAllSubGroupAccounts();
    }

}
