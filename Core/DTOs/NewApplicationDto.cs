using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class NewApplicationDto
    {
        #region personal information
        public string? Title { get; set; }
        public string? FullName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? EmailAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? IdNumber { get; set; }
        #endregion

        #region residential address
        public int StateId { get; set; }
        public int OperationAreaId { get; set; }
        public int BranchId { get; set; }
        public int TerritoryId { get; set; }
        public int SubTerritoryId { get; set; }
        public string? StreetAddress { get; set; }
        public string? PlotNumber { get; set; }
        public string? NearestLandMark { get; set; }
        #endregion endof residential address

        #region connection details
        public string? CustomerType { get; set; }
        public string? BillDeliveryMethod { get; set; }
        public int CustomerCategory { get; set; }


        #endregion

        public string? ProofOfIdentity { get; set; }
        public string? ProofOfOwnerShip { get; set; }
        public string? ProofOfInstallationSite { get; set; }
        public string? LocalAuthorizationDocument { get; set; }

    }
}
