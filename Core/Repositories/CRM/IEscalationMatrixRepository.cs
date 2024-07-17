﻿using Core.Models.CRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.CRM
{
    public interface IEscalationMatrixRepository
    {
        Task CreateEscalationMatrixAsync(EscalationMatrix matrix);
        Task<IEnumerable<EscalationMatrix>> GetAllEscalationMatricesAsync();
        Task<EscalationMatrix> GetEscalationMatrixByDepartmentIdAsync(int departmentId);
    }
}
