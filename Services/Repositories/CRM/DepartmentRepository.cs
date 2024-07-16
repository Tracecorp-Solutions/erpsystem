using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Repositories.CRM;
using Infrastructure.Data;
using Core.Models.CRM;
using Microsoft.EntityFrameworkCore;
using Core.DTOs.CRM;

namespace Services.Repositories.CRM
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDbContext _context;

        public DepartmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddDepartment(DepartmentDto dep)
        {
            //map the dto to the model
            var department = new Department
            {
                Name = dep.Name,
                Description = dep.Description,
                HeadDepactId = dep.HeadDepactId,
                Active = true
            };

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
            var departments = await _context.Departments
                .Include(d => d.User)
                .ToListAsync();
            return departments == null ? throw new ArgumentException("No Departments found"): departments;
        }

        public async Task UpdateDepartment(Department department)
        {
            // Check if department exists in the database
            var departmentExists = await _context.Departments.AsNoTracking().FirstOrDefaultAsync(d => d.Id == department.Id);
            if (departmentExists == null)
                throw new ArgumentException("Department does not exist");

            // Attach the updated entity and mark it as modified
            _context.Entry(department).State = EntityState.Modified;

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
