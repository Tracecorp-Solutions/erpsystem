using Core.DTOs.CRM;
using Core.Models.CRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.CRM
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> GetDepartments();
        Task<Department> GetDepartment(int id);
        Task AddDepartment(DepartmentDto department);
        Task DeleteDepartment(int id);
        Task UpdateDepartment(Department department);

    }
}
