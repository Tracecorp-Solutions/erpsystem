using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatingForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewMeterServicings_MeterTypes_MeterTypeNavigationId",
                table: "NewMeterServicings");

            migrationBuilder.DropIndex(
                name: "IX_NewMeterServicings_MeterTypeNavigationId",
                table: "NewMeterServicings");

            migrationBuilder.DropColumn(
                name: "MeterTypeNavigationId",
                table: "NewMeterServicings");

            migrationBuilder.CreateIndex(
                name: "IX_NewMeterServicings_MeterTypeId",
                table: "NewMeterServicings",
                column: "MeterTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_NewMeterServicings_MeterTypes_MeterTypeId",
                table: "NewMeterServicings",
                column: "MeterTypeId",
                principalTable: "MeterTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewMeterServicings_MeterTypes_MeterTypeId",
                table: "NewMeterServicings");

            migrationBuilder.DropIndex(
                name: "IX_NewMeterServicings_MeterTypeId",
                table: "NewMeterServicings");

            migrationBuilder.AddColumn<int>(
                name: "MeterTypeNavigationId",
                table: "NewMeterServicings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_NewMeterServicings_MeterTypeNavigationId",
                table: "NewMeterServicings",
                column: "MeterTypeNavigationId");

            migrationBuilder.AddForeignKey(
                name: "FK_NewMeterServicings_MeterTypes_MeterTypeNavigationId",
                table: "NewMeterServicings",
                column: "MeterTypeNavigationId",
                principalTable: "MeterTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
