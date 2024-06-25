using Core.DTOs.Billing;
using Core.DTOs.UserManagement;
using Core.Models.Billing;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Billing
{
    public interface INewConnectionRepository
    {
        Task<string> RegisterNewCustomer(List<IFormFile> file,NewApplicationDto application);

        Task<IEnumerable<Application>> GetApplications();

        Task<Application> GetApplicationByApplicationId(string applicationId);

        Task<IEnumerable<SurveyorDto>> GetSurveyor();

        Task<string> AssignSurveyor(string applicationId, int surveyorId,DateOnly ScheduledDate);

        Task<string> SubmitSurveyReport(IFormFile formFile,SurveyReportDto report);

        Task ApproveOrRejectApplication(ApplicationApprovalDto approvalDto);

        Task<IEnumerable<ApplicationLog>> GetApplicationLogs(string applicationNumber);

        Task AuthorizeConnection(AuthorizeConnectionDto connectionDto);

        Task<string> GenerateJobCard(string applicationNumber, int userid);

        Task<string> AddConnectionInvoice(NewConnectionInvoiceDto invoiceDto);

        Task<string> GetNewConnectionInvoice(string applicationNumber);

        Task AddDocketInitiation(DocketInitiationDto docketInitiationDto);

        Task<string> GenerateCustomerRef();

      
    }
}
