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

        Task<IEnumerable<SurveyorDto>> GetPlumbers();
        Task<IEnumerable<SurveyorDto>> GetMeterReaders();
        Task<string> AssignSurveyor(string applicationId, int surveyorId,DateOnly ScheduledDate);

        Task<string> SubmitSurveyReport(IFormFile formFile,SurveyReportDto report);

        Task ApproveOrRejectApplication(ApplicationApprovalDto approvalDto);

        Task<IEnumerable<ApplicationLog>> GetApplicationLogs(string applicationNumber);

        Task AuthorizeConnection(AuthorizeConnectionDto connectionDto);

        Task<string> GenerateJobCard(string applicationNumber, int userid);

        Task<string> AddConnectionInvoice(NewConnectionInvoiceDto invoiceDto);

        Task<string> GetNewConnectionInvoice(string applicationNumber);

        Task AddDocketInitiation(DocketInitiationDto docketInitiationDto);
        Task<DocketInitiation> GetDocketInitiationByApplicationNumber(string applicationNumber);

        Task EditDocketInitiation(DocketInitiationDto docket);

        Task<string> GenerateCustomerRef();

        Task<IEnumerable<NewConnectionInvoiceDto>> GetAllInvoices();

        Task<NewConnectionInvoiceDto> GetInvoiceByInvoiceNumber(string invoiceNumber);

        Task AssignCustomerTarrif(string applicationNumber, int trarrifId);

        Task<string> GetJobCardNumberByApplicationNumber(string applicationNumber);

        Task<SurveyReport> GetSurveyReportByApplicationNumber(string applicationNumber);


    }
}
