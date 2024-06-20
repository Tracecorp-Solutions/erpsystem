using Core.DTOs;
using Core.Models;
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
        Task<string> RegisterNewCustomer(IFormFile file,NewApplicationDto application);

        Task<IEnumerable<Application>> GetApplications();

        Task<Application> GetApplicationByApplicationId(string applicationId);

        Task<IEnumerable<SurveyorDto>> GetSurveyor();

        Task<string> AssignSurveyor(string applicationId, int surveyorId,DateOnly ScheduledDate);

        Task<string> SubmitSurveyReport(SurveyReportDto report);

      
    }
}
