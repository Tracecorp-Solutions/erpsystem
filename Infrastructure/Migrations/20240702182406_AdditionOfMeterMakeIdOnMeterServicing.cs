using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfMeterMakeIdOnMeterServicing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MeterMakeId",
                table: "NewMeterServicings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_NewMeterServicings_MeterMakeId",
                table: "NewMeterServicings",
                column: "MeterMakeId");

            migrationBuilder.AddForeignKey(
                name: "FK_NewMeterServicings_MeterMakes_MeterMakeId",
                table: "NewMeterServicings",
                column: "MeterMakeId",
                principalTable: "MeterMakes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewMeterServicings_MeterMakes_MeterMakeId",
                table: "NewMeterServicings");

            migrationBuilder.DropIndex(
                name: "IX_NewMeterServicings_MeterMakeId",
                table: "NewMeterServicings");

            migrationBuilder.DropColumn(
                name: "MeterMakeId",
                table: "NewMeterServicings");
        }
    }
}
