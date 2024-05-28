using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddingForeignKeysToInvitedUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Users",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_InvitedUsers_OrganisationId",
                table: "InvitedUsers",
                column: "OrganisationId");

            migrationBuilder.CreateIndex(
                name: "IX_InvitedUsers_RoleId",
                table: "InvitedUsers",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvitedUsers_Organisations_OrganisationId",
                table: "InvitedUsers",
                column: "OrganisationId",
                principalTable: "Organisations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvitedUsers_Roles_RoleId",
                table: "InvitedUsers",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvitedUsers_Organisations_OrganisationId",
                table: "InvitedUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_InvitedUsers_Roles_RoleId",
                table: "InvitedUsers");

            migrationBuilder.DropIndex(
                name: "IX_InvitedUsers_OrganisationId",
                table: "InvitedUsers");

            migrationBuilder.DropIndex(
                name: "IX_InvitedUsers_RoleId",
                table: "InvitedUsers");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "Users");
        }
    }
}
