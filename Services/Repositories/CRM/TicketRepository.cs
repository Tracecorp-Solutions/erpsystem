using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Core.DTOs.CRM;
using Core.DTOs.UserManagement;
using Core.Models.CRM;
using Core.Repositories.CRM;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
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

            if(escalationMatrix == null)
                throw new ArgumentException("Priority and TicketCategory not set in the Escalation Matrix");

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
                AssignedTo = escalationMatrix?.DepartmentId ?? 0, // Ensure to handle null case for escalationMatrix
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
            return await _context.Tickets
                .Include(t=>t.Priority)
                .Include(t=>t.TicketCategory)
                .Include(t=>t.Territory)
                .Include(t=>t.Branch)
                .Include(t=>t.OperationArea)
                .Include(t=>t.EscalationMatrix)
                    .ThenInclude(em=>em.Department)
                .ToListAsync();
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

        public async Task EscalateTicket(EscalateTicketDto dto) 
        {
            var ticket = await _context.Tickets
                .Include(t => t.EscalationMatrix)
                .FirstOrDefaultAsync(t => t.Id == dto.TicketId);

            if (ticket == null)
                throw new ArgumentException("Ticket not found");

            var escalationMatrix = await _context.EscalationMatrices
                .FirstOrDefaultAsync(e => e.PriorityId == ticket.PriorityId && e.TicketCategoryId == ticket.TicketCategoryId);

            if (escalationMatrix == null)
                throw new ArgumentException("Escalation matrix not found");

            var ticketAuditTrail = new TicketAuditTrail
            {
                TicketId = ticket.Id,
                Status = "Escalated",
                AssignedTo = dto.DepartmentId,
                RecordedBy = dto.RecordedBy,
                RecordedAt = DateTime.Now,
                ReasonOfEscalation = dto.ReasonOfEscalation
            };

            ticket.AssignedTo = dto.DepartmentId;
            ticket.Status= "Escalated";
            ticket.EscalationMatrixId = escalationMatrix.Id;

            await _context.TicketAuditTrails.AddAsync(ticketAuditTrail);
            await _context.SaveChangesAsync();
        }

        public async Task ResolveTicket(IFormFile file, EscalateTicketDto dto)
        {
            var ticket = await _context.Tickets
                .Include(t => t.EscalationMatrix)
                .FirstOrDefaultAsync(t => t.Id == dto.TicketId);

            if (ticket == null)
                throw new ArgumentException("Ticket not found");

            var ticketAuditTrail = new TicketAuditTrail
            {
                TicketId = ticket.Id,
                Status = "Resolved",
                AssignedTo = dto.DepartmentId,
                RecordedBy = dto.RecordedBy,
                RecordedAt = DateTime.Now,
                ReasonOfEscalation = dto.ReasonOfEscalation
            };

            ticket.Status = "Resolved";

            await _context.TicketAuditTrails.AddAsync(ticketAuditTrail);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TicketStatusSummaryDto>> GetTicketStatusSummaryAsync()
        {
            var result = await _context.Tickets
                .ToListAsync(); // Fetch all tickets from the database

            var summary = result
                .GroupBy(t => t.CreationDate.Month) // Group by month number
                .Select(g => new TicketStatusSummaryDto
                {
                    Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
                    OpenTickets = g.Count(t => t.Status == "Open"),
                    TicketsInProgress = g.Count(t => t.Status == "In Progress"),
                    TicketsResolved = g.Count(t => t.Status == "Resolved")
                })
                .ToList(); // Perform grouping in memory

            return summary;
        }


        public async Task<TicketStatisticsDto> GetTicketStatisticsAsync()
        {
            var result = new TicketStatisticsDto
            {
                TotalTickets = await _context.Tickets.CountAsync(),
                OpenTickets = await _context.Tickets.CountAsync(t => t.Status == "Open"),
                ResolvedTickets = await _context.Tickets.CountAsync(t => t.Status == "Resolved"),
                OpenHighPriorityTickets = await _context.Tickets.CountAsync(t => t.Status == "Open" && t.Priority.PriorityName == "High")
            };

            return result;
        }

        // Update ticket
        public async Task UpdateTicket(UpdateTicketDto ticket)
        {
            var existingTicket = await _context.Tickets
                .FirstOrDefaultAsync(t => t.Id == ticket.Id);

            if (existingTicket == null)
                throw new ArgumentException("Ticket not found");


            existingTicket.CustomerType = ticket.CustomerType;
            existingTicket.CustomerRef = ticket.CustomerRef;
            existingTicket.CustomerName = ticket.CustomerName;
            existingTicket.OperationAreaId = ticket.OperationAreaId;
            existingTicket.BranchId = ticket.BranchId;
            existingTicket.TerritoryId = ticket.TerritoryId;
            existingTicket.PhoneNumber = ticket.PhoneNumber;
            existingTicket.Address = ticket.Address;
            existingTicket.ComplaintSubject = ticket.ComplaintSubject;
            existingTicket.TicketCategoryId = ticket.TicketCategoryId;
            existingTicket.TicketSource = ticket.TicketSource;
            existingTicket.PriorityId = ticket.PriorityId;
            existingTicket.Description = ticket.Description;
            existingTicket.AssignedTo = ticket.AssignedTo;

            //record trail for ticket update
            var ticketAuditTrail = new TicketAuditTrail
            {
                TicketId = existingTicket.Id,
                Status = "Updated",
                AssignedTo = existingTicket.AssignedTo,
                RecordedBy = "",
                RecordedAt = DateTime.Now,
                ReasonOfEscalation = "Normal"
            };

            await _context.SaveChangesAsync();
        }
    }
}