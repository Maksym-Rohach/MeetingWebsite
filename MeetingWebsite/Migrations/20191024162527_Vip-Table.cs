using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MeetingWebsite.Migrations
{
    public partial class VipTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {                       
            migrationBuilder.CreateTable(
                name: "VipUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DateForValid = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VipUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VipUsers_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });           
          
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.DropTable(
                name: "VipUsers");
        }
    }
}
