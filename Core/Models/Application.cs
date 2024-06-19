using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Application
    {
        public int Id { get; set; }
        public string? ApplicationNumber { get; set; }
        #region personal information
        public string Title { get; set; }
        public string FullName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string IdNumber { get; set; }
        #endregion

        #region residential address

        [ForeignKey("State")]
        public int StateId { get; set; }

        [ForeignKey("OperationArea")]
        public int OperationAreaId { get; set; }

        [ForeignKey("Branch")]
        public int BranchId { get; set; }

        [ForeignKey("Territory")]
        public int TerritoryId { get; set; }

        [ForeignKey("SubTerritory")]
        public int SubTerritoryId { get; set; }
        public string StreetAddress { get; set; }
        public string PlotNumber { get; set; }
        public string? NearestLandMark { get; set; }
        #endregion endof residential address

        #region connection details
        public string CustomerType { get; set; }
        public string BillDeliveryMethod { get; set; }
        public int CustomerCategory {  get; set; }

        #endregion

        #region supporting Documents
        public string ProofOfIdentity { get; set; }
        public string ProofOfOwnerShip { get; set; }
        public string ProofOfInstallationSite { get; set; }
        public string LocalAuthorizationDocument { get; set; }
        #endregion
        public State? State { get; set; }

        public OperationArea? OperationArea { get; set; }
        public Branch? Branch { get; set; }
        public Territory? Territory { get; set; }
        public SubTerritory? SubTerritory { get; set; }
    }
}
