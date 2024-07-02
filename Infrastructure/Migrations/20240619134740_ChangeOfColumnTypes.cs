using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeOfColumnTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CustomerType",
                table: "Applications",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "BillDeliveryMethod",
                table: "Applications",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_BranchId",
                table: "Applications",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_OperationAreaId",
                table: "Applications",
                column: "OperationAreaId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_StateId",
                table: "Applications",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_SubTerritoryId",
                table: "Applications",
                column: "SubTerritoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_TerritoryId",
                table: "Applications",
                column: "TerritoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Branches_BranchId",
                table: "Applications",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_OperationAreas_OperationAreaId",
                table: "Applications",
                column: "OperationAreaId",
                principalTable: "OperationAreas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_States_StateId",
                table: "Applications",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_SubTerritories_SubTerritoryId",
                table: "Applications",
                column: "SubTerritoryId",
                principalTable: "SubTerritories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Territories_TerritoryId",
                table: "Applications",
                column: "TerritoryId",
                principalTable: "Territories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Branches_BranchId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_OperationAreas_OperationAreaId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_States_StateId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_SubTerritories_SubTerritoryId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Territories_TerritoryId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_BranchId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_OperationAreaId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_StateId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_SubTerritoryId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_TerritoryId",
                table: "Applications");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerType",
                table: "Applications",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "BillDeliveryMethod",
                table: "Applications",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
