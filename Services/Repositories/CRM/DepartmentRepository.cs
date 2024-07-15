using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Repositories.CRM;
using Infrastructure.Data;
using Core.Models.CRM;

namespace Services.Repositories.CRM
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDbContext _context;

        public DepartmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Department> AddDepartment(Department department)
        {
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();
            return department;
        }

        public async Task<Department> GetDepartment(int id)
        {
            var departments = await _context.Departments.FindAsync(id);
            return departments == null? throw new ArgumentException("No Department Found with that id") : departments;
        }

        public async Task<IEnumerable<Department>> GetDepartments()
        {
            return _context.Departments;
        }

    }
}
