using Microsoft.EntityFrameworkCore.Migrations;

namespace ngDemo.Migrations
{
    public partial class addField_AvaratImg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarImg",
                table: "AbpUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarImg",
                table: "AbpUsers");
        }
    }
}
