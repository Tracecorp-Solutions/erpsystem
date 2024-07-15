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

        public async Task AddDepartment(Department department)
        {
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();
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

        public async Task UpdateDepartment(Department department)
        {
            //check if department exists
            var departmentExists = await _context.Departments.FindAsync(department.Id);
            if (departmentExists != null)
                throw new ArgumentException("Department does not exist");

            _context.Departments.Update(department);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
                throw new ArgumentException("Department does not exist");

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
        }

    }
}
