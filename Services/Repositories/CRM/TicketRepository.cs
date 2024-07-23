using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.DTOs.CRM;
using Core.Models.CRM;
using Core.Repositories.CRM;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Services.Repositories.CRM
{
    public class TicketRepository : ITicketRepository
    {
        private readonly ApplicationDbContext _context;

        public TicketRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateTicketAsync(TicketDto ticket)
        {
            var escalationMatrix = await _context.EscalationMatrices
                .FirstOrDefaultAsync(e => e.PriorityId == ticket.PriorityId && e.TicketCategoryId == ticket.TicketCategoryId);

            var newTicket = new Ticket
            {
                CustomerType = ticket.CustomerType,
                CustomerRef = ticket.CustomerRef,
                CustomerName = ticket.CustomerName,
                OperationAreaId = ticket.OperationAreaId,
                BranchId = ticket.BranchId,
                TerritoryId = ticket.TerritoryId,
                PhoneNumber = ticket.PhoneNumber,
                Address = ticket.Address,
                ComplaintSubject = ticket.ComplaintSubject,
                TicketCategoryId = ticket.TicketCategoryId,
                TicketSource = ticket.TicketSource,
                PriorityId = ticket.PriorityId,
                Description = ticket.Description,
                EscalationMatrixId = (int)(escalationMatrix?.Id),
                Status = "Open",
                CreationDate = DateTime.Now
            };

            await _context.Tickets.AddAsync(newTicket);

            var ticketAuditTrail = new TicketAuditTrail
            {
                TicketId = newTicket.Id,
                Status = "Created",
                AssignedTo = escalationMatrix?.DepartmentId ?? 0, // Ensure to handle null case for escalationMatrix
                RecordedBy = ticket.RecordedBy,
                RecordedAt = DateTime.Now,
                ReasonOfEscalation="Normal"
            };

            await _context.TicketAuditTrails.AddAsync(ticketAuditTrail);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Ticket>> GetAllTicketsAsync()
        {
            return await _context.Tickets.ToListAsync();
        }

        public async Task<FetchTicketDto> GetTicketByIdAsync(int ticketId)
        {
            var ticket = await _context.Tickets
                .Include(t => t.Priority)
                .Include(t => t.TicketCategory)
                .Include(t => t.Territory)
                .Include(t => t.Branch)
                .Include(t => t.OperationArea)
                .Include(t => t.EscalationMatrix)
                    .ThenInclude(em => em.Department)
                .FirstOrDefaultAsync(t => t.Id == ticketId);

            if (ticket == null)
                throw new ArgumentException("Ticket not found");

            var ticketAuditTrail = await _context.TicketAuditTrails
                .Where(t => t.TicketId == ticketId)
                .ToListAsync();

            var fetchTicket = new FetchTicketDto
            {
                Ticket = ticket,
                TicketAuditTrails = ticketAuditTrail
            };

            return fetchTicket;
        }

        public async Task<IEnumerable<Ticket>> GetTicketsByBranchIdAsync(int branchId)
        {
            return await _context.Tickets
                .Where(t => t.BranchId == branchId)
                .ToListAsync();
        }
    }
}