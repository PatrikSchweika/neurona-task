using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeuronaTask.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDiagnosisTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Diagnoses",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Diagnoses");
        }
    }
}