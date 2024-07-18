using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfPriority : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PriorityId",
                table: "EscalationMatrices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TicketCategoryId",
                table: "EscalationMatrices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PriorityName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_EscalationMatrices_PriorityId",
                table: "EscalationMatrices",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_EscalationMatrices_TicketCategoryId",
                table: "EscalationMatrices",
                column: "TicketCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_EscalationMatrices_Priorities_PriorityId",
                table: "EscalationMatrices",
                column: "PriorityId",
                principalTable: "Priorities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EscalationMatrices_TicketCategories_TicketCategoryId",
                table: "EscalationMatrices",
                column: "TicketCategoryId",
                principalTable: "TicketCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EscalationMatrices_Priorities_PriorityId",
                table: "EscalationMatrices");

            migrationBuilder.DropForeignKey(
                name: "FK_EscalationMatrices_TicketCategories_TicketCategoryId",
                table: "EscalationMatrices");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropIndex(
                name: "IX_EscalationMatrices_PriorityId",
                table: "EscalationMatrices");

            migrationBuilder.DropIndex(
                name: "IX_EscalationMatrices_TicketCategoryId",
                table: "EscalationMatrices");

            migrationBuilder.DropColumn(
                name: "PriorityId",
                table: "EscalationMatrices");

            migrationBuilder.DropColumn(
                name: "TicketCategoryId",
                table: "EscalationMatrices");
        }
    }
}
