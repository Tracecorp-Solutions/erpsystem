using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatingBlockIdInApplications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Branches_BranchId",
                table: "Blocks");

            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_OperationAreas_OperationAreaId",
                table: "Blocks");

            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_SubTerritories_SubTerritoryId",
                table: "Blocks");

            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Territories_TerritoryId",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_BranchId",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_OperationAreaId",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_SubTerritoryId",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_TerritoryId",
                table: "Blocks");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Blocks");

            migrationBuilder.DropColumn(
                name: "OperationAreaId",
                table: "Blocks");

            migrationBuilder.DropColumn(
                name: "SubTerritoryId",
                table: "Blocks");

            migrationBuilder.DropColumn(
                name: "TerritoryId",
                table: "Blocks");

            migrationBuilder.AddColumn<int>(
                name: "BlockId",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_BlockId",
                table: "Applications",
                column: "BlockId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Blocks_BlockId",
                table: "Applications",
                column: "BlockId",
                principalTable: "Blocks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Blocks_BlockId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_BlockId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "BlockId",
                table: "Applications");

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Blocks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OperationAreaId",
                table: "Blocks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubTerritoryId",
                table: "Blocks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TerritoryId",
                table: "Blocks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_BranchId",
                table: "Blocks",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_OperationAreaId",
                table: "Blocks",
                column: "OperationAreaId");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_SubTerritoryId",
                table: "Blocks",
                column: "SubTerritoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_TerritoryId",
                table: "Blocks",
                column: "TerritoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Branches_BranchId",
                table: "Blocks",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_OperationAreas_OperationAreaId",
                table: "Blocks",
                column: "OperationAreaId",
                principalTable: "OperationAreas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_SubTerritories_SubTerritoryId",
                table: "Blocks",
                column: "SubTerritoryId",
                principalTable: "SubTerritories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Territories_TerritoryId",
                table: "Blocks",
                column: "TerritoryId",
                principalTable: "Territories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
