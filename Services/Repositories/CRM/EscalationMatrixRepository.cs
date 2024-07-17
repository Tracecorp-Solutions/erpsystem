using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Repositories.CRM;
using Infrastructure.Data;
using Core.Models.CRM;
using Core.DTOs.CRM;
using Microsoft.EntityFrameworkCore;

namespace Services.Repositories.CRM
{
    public class EscalationMatrixRepository : IEscalationMatrixRepository
    {
        private readonly ApplicationDbContext _context;

        public EscalationMatrixRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateEscalationMatrixAsync(EscatalationMatrixDto matrix)
        {
            //mapping dto to model
            var escmatrix = new EscalationMatrix
            {
                DepartmentId = matrix.DepartmentId,
                EscalationTime = matrix.EscalationTime
            };

            _context.EscalationMatrices.Add(escmatrix);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<EscalationMatrix>> GetAllEscalationMatricesAsync()
        {
            var result = await _context.EscalationMatrices
                .Include(esc => esc.Department)
                .ToListAsync();

            return result;
        }

        public async Task<EscalationMatrix> GetEscalationMatrixByDepartmentIdAsync(int departmentId)
        {
            var matrices = await _context.EscalationMatrices
                .Include(esc => esc.Department)
                .FirstOrDefaultAsync(x => x.DepartmentId==departmentId);
            return matrices == null ? throw new ArgumentException("No matrix for this department") : matrices ;
        }


    }
}
