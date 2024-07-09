using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfBillingPeriodAndBulkMeterReadings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BillingPeriod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsCompleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Active = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingPeriod", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BulkReadings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OperationAreaId = table.Column<int>(type: "int", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    BillingCycleId = table.Column<int>(type: "int", nullable: false),
                    ReadingDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    MeterReaderId = table.Column<int>(type: "int", nullable: false),
                    filelocation = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BulkReadings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BulkReadings_BillingRequests_BillingCycleId",
                        column: x => x.BillingCycleId,
                        principalTable: "BillingRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BulkReadings_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BulkReadings_OperationAreas_OperationAreaId",
                        column: x => x.OperationAreaId,
                        principalTable: "OperationAreas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_BillingRequests_BillingPeriodId",
                table: "BillingRequests",
                column: "BillingPeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_BulkReadings_BillingCycleId",
                table: "BulkReadings",
                column: "BillingCycleId");

            migrationBuilder.CreateIndex(
                name: "IX_BulkReadings_BranchId",
                table: "BulkReadings",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_BulkReadings_OperationAreaId",
                table: "BulkReadings",
                column: "OperationAreaId");

            migrationBuilder.AddForeignKey(
                name: "FK_BillingRequests_BillingPeriod_BillingPeriodId",
                table: "BillingRequests",
                column: "BillingPeriodId",
                principalTable: "BillingPeriod",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BillingRequests_BillingPeriod_BillingPeriodId",
                table: "BillingRequests");

            migrationBuilder.DropTable(
                name: "BillingPeriod");

            migrationBuilder.DropTable(
                name: "BulkReadings");

            migrationBuilder.DropIndex(
                name: "IX_BillingRequests_BillingPeriodId",
                table: "BillingRequests");
        }
    }
}
