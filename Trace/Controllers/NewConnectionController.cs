﻿using Core.DTOs.Billing;
using Core.DTOs.UserManagement;
using Core.Models;
using Core.Repositories.Billing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewConnectionController : ControllerBase
    {
        private readonly INewConnectionRepository _newconnectionRepository;

        public NewConnectionController(INewConnectionRepository newconnectionRepository) 
        {
            _newconnectionRepository = newconnectionRepository;
        }

        [HttpPost("/NewApplication")]
        public async Task<IActionResult> NewApplication([FromForm] List<IFormFile> files, [FromForm] NewApplicationDto application) 
        {
            try
            {
                string appnumber = await _newconnectionRepository.RegisterNewCustomer(files, application);
                return Ok($"Application Registered Successfully Reference Number is {appnumber}");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetApplications")]
        public async Task<IActionResult> GetApplications() 
        {
            try
            {
                var applications = await _newconnectionRepository.GetApplications();
                return Ok(applications);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetSurveyors")]
        public async Task<IActionResult> GetSurveyors() 
        {
            try
            {
                var surveyors = await _newconnectionRepository.GetSurveyor();
                return Ok(surveyors);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetApplicationByApplicationNumnber")]
        public async Task<IActionResult> GetApplicationByApplicationNumnber(string applicationId) 
        {
            try
            {
                var application = await _newconnectionRepository.GetApplicationByApplicationId(applicationId);
                return Ok(application);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AssignSurveyor")]
        public async Task<IActionResult> AssignSurveyor(string applicationId, int surveyorId, DateOnly ScheduledDate) 
        {
            try
            {
                string message = await _newconnectionRepository.AssignSurveyor(applicationId, surveyorId, ScheduledDate);
                return Ok(message);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/SubmitSurveyReport")]
        public async Task<IActionResult> SubmitSurveyReport([FromForm]IFormFile formFile, [FromForm] SurveyReportDto report) 
        {
            try
            {
                string message = await _newconnectionRepository.SubmitSurveyReport(formFile, report);
                return Ok(message);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetSurveyReportByApplicationNumber")]
        public async Task<IActionResult> GetSurveyReportByApplicationNumber(string applicationNumber)
        {
            try
            {
                var surveyReport = await _newconnectionRepository.GetSurveyReportByApplicationNumber(applicationNumber);
                return Ok(surveyReport);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/ApproveOrRejectApplication")]
        public async Task<IActionResult> ApproveOrRejectApplication(ApplicationApprovalDto approvalDto) 
        {
            try
            {
                await _newconnectionRepository.ApproveOrRejectApplication(approvalDto);
                return Ok("Application Approved/Rejected Successfully");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request."+ex.Message);
            }
        }

        [HttpGet("/GetApplicationLogs")]
        public async Task<IActionResult> GetApplicationLogs(string applicationNumber) 
        {
            try
            {
                var logs = await _newconnectionRepository.GetApplicationLogs(applicationNumber);
                return Ok(logs);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AuthorizeConnection")]
        public async Task<IActionResult> AuthorizeConnection(AuthorizeConnectionDto ApprovalDto) 
        {
            try
            {
                await _newconnectionRepository.AuthorizeConnection(ApprovalDto);
                return Ok("Connection Authorized Successfully");
            }
            catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/GenerateJobCard")]
        public async Task<IActionResult> GenerateJobCard(string applicationNumber, int userid)
        {
            try
            {
                string message = await _newconnectionRepository.GenerateJobCard(applicationNumber, userid);
                return Ok(message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddConnectionInvoice")]
        public async Task<IActionResult> AddConnectionInvoice(NewConnectionInvoiceDto invoiceDto)
        {
            try
            {
                string message = await _newconnectionRepository.AddConnectionInvoice(invoiceDto);
                return Ok($"Invoice created successfully with invoice number {message}");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetNewConnectionInvoice")]
        public async Task<IActionResult> GetNewConnectionInvoice(string applicationNumber)
        {
            try
            {
                var invoice = await _newconnectionRepository.GetNewConnectionInvoice(applicationNumber);
                return Ok(invoice);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/DocketInitiation")]
        public async Task<IActionResult> DocketInitiation(DocketInitiationDto docket) 
        {
            try
            {
                await _newconnectionRepository.AddDocketInitiation(docket);
                return Ok("Docket Initiation Added Succesffuly");

            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GenerateCustomerRef")]
        public async Task<IActionResult> GenerateCustomerRef()
        {
            try
            {
                string customerRef = await _newconnectionRepository.GenerateCustomerRef();
                return Ok(customerRef);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetDocketInitiation")]
        public async Task<IActionResult> GetDocketInitiationByApplicationNumber(string applicationNumber) 
        {
            try
            {
                var docket = await _newconnectionRepository.GetDocketInitiationByApplicationNumber(applicationNumber);
                return Ok(docket);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/EditDocketInitiation")]
        public async Task<IActionResult> EditDocketInitiation(DocketInitiationDto docket) 
        {
            try
            {
                await _newconnectionRepository.EditDocketInitiation(docket);
                return Ok("Docket Initiation Updated Succesffuly");

            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetAllInvoices")]
        public async Task<IActionResult> GetAllInvoices()
        {
            try
            {
                var invoices = await _newconnectionRepository.GetAllInvoices();
                return Ok(invoices);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetInvoiceByInvoiceNumber")]
        public async Task<IActionResult> GetInvoiceByInvoiceNumber(string invoiceNumber)
        {
            try
            {
                var invoice = await _newconnectionRepository.GetInvoiceByInvoiceNumber(invoiceNumber);
                return Ok(invoice);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("AssignCustomerTarrif")]
        public async Task<IActionResult> AssignCustomerTarrif(string appilcationNumber, int tarrifId)
        {
            try
            {
                await _newconnectionRepository.AssignCustomerTarrif(appilcationNumber, tarrifId);
                return Ok("Tarrif Assigned Successfully");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetJobCardNumberByApplicationId")]
        public async Task<IActionResult> GetJobCardNumberByApplicationId(string applicationNumber)
        {
            try
            {
                var jobCardNumber = await _newconnectionRepository.GetJobCardNumberByApplicationNumber(applicationNumber);
                return Ok(jobCardNumber);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        //get plumbers
        [HttpGet("/GetPlumbers")]
        public async Task<IActionResult> GetPlumbers()
        {
            try
            {
                var plumbers = await _newconnectionRepository.GetPlumbers();
                return Ok(plumbers);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        //get meter readers
        [HttpGet("/GetMeterReaders")]
        public async Task<IActionResult> GetMeterReaders()
        {
            try
            {
                var meterReaders = await _newconnectionRepository.GetMeterReaders();
                return Ok(meterReaders);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
