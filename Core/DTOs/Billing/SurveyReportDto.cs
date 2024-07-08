using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class SurveyReportDto
    {
        public int Id { get; set; }
        public int SurveyorId { get; set; }
        public string ApplicationNumber { get; set; }

        public string JobCard { get; set; }

        #region survey questions
        public string? DistanceFromMain { get; set; }
        public string? LandType { get; set; }
        public string? Obstractions { get; set; }
        public string? MainLineDetails { get; set; }
        public string? ServicePipeSize { get; set; }
        public string? ServicePipeLength { get; set; }
        public string? IdealConnectionType { get; set; }
        public string? ServicePipeMaterial { get; set; }
        public string? ExistingMainSize { get; set; }
        public string? ServicePipeDepth { get; set; }
        public string? ConnectionFromExistingServicePipe { get; set; }
        public string? ExistingConnections { get; set; }
        public string? BlocMapNumber { get; set; }
        public string? NearByCustomer { get; set; }
        public string? DistanceToConnectionPoint { get; set; }
        public string? ConnectionMainDetails { get; set; }
        public string? RoadInformation { get; set; }
        public string? Recommendation { get; set; }
        #endregion

        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
    }
}
