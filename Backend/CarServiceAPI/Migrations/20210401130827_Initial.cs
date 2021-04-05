using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarServiceAPI.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RentService",
                columns: table => new
                {
                    ServiceId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ServiceName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Img = table.Column<string>(type: "nvarchar(500)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", nullable: false),
                    About = table.Column<string>(type: "nvarchar(4000)", nullable: false),
                    PriceTable = table.Column<string>(type: "nvarchar(500)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(4000)", nullable: false),
                    Lat = table.Column<decimal>(type: "decimal", nullable: false),
                    Lng = table.Column<decimal>(type: "decimal", nullable: false),
                    Rate = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentService", x => x.ServiceId);
                });

            migrationBuilder.CreateTable(
                name: "UserDetails",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    UserType = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    StringToken = table.Column<string>(nullable: true),
                    IsVerify = table.Column<bool>(nullable: false),
                    LogOut = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDetails", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "OfficeDetail",
                columns: table => new
                {
                    OfficeId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OfficeName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Lat = table.Column<float>(type: "float", nullable: false),
                    Lng = table.Column<float>(type: "float", nullable: false),
                    RentServiceServiceId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfficeDetail", x => x.OfficeId);
                    table.ForeignKey(
                        name: "FK_OfficeDetail_RentService_RentServiceServiceId",
                        column: x => x.RentServiceServiceId,
                        principalTable: "RentService",
                        principalColumn: "ServiceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CarInfo",
                columns: table => new
                {
                    CarId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ServiceName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Brand = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Year = table.Column<decimal>(type: "decimal", nullable: false),
                    PricePerDay = table.Column<decimal>(type: "decimal", nullable: false),
                    NumOfSeats = table.Column<decimal>(type: "decimal", nullable: false),
                    ImgUrl = table.Column<string>(type: "nvarchar(500)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    EndLocation = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    TypeOfCar = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    IsTaken = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Sale = table.Column<bool>(nullable: false),
                    RentServiceServiceId = table.Column<int>(nullable: true),
                    UserDetailUserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarInfo", x => x.CarId);
                    table.ForeignKey(
                        name: "FK_CarInfo_RentService_RentServiceServiceId",
                        column: x => x.RentServiceServiceId,
                        principalTable: "RentService",
                        principalColumn: "ServiceId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarInfo_UserDetails_UserDetailUserId",
                        column: x => x.UserDetailUserId,
                        principalTable: "UserDetails",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rate",
                columns: table => new
                {
                    RateID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RateNumber = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    CarInfoCarId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rate", x => x.RateID);
                    table.ForeignKey(
                        name: "FK_Rate_CarInfo_CarInfoCarId",
                        column: x => x.CarInfoCarId,
                        principalTable: "CarInfo",
                        principalColumn: "CarId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReservationDetails",
                columns: table => new
                {
                    ReservationId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    StartOfficeId = table.Column<int>(nullable: true),
                    EndOfficeId = table.Column<int>(nullable: true),
                    CarId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Price = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationDetails", x => x.ReservationId);
                    table.ForeignKey(
                        name: "FK_ReservationDetails_CarInfo_CarId",
                        column: x => x.CarId,
                        principalTable: "CarInfo",
                        principalColumn: "CarId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationDetails_OfficeDetail_EndOfficeId",
                        column: x => x.EndOfficeId,
                        principalTable: "OfficeDetail",
                        principalColumn: "OfficeId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReservationDetails_OfficeDetail_StartOfficeId",
                        column: x => x.StartOfficeId,
                        principalTable: "OfficeDetail",
                        principalColumn: "OfficeId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReservationDetails_UserDetails_UserId",
                        column: x => x.UserId,
                        principalTable: "UserDetails",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarInfo_RentServiceServiceId",
                table: "CarInfo",
                column: "RentServiceServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_CarInfo_UserDetailUserId",
                table: "CarInfo",
                column: "UserDetailUserId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeDetail_RentServiceServiceId",
                table: "OfficeDetail",
                column: "RentServiceServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Rate_CarInfoCarId",
                table: "Rate",
                column: "CarInfoCarId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationDetails_CarId",
                table: "ReservationDetails",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationDetails_EndOfficeId",
                table: "ReservationDetails",
                column: "EndOfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationDetails_StartOfficeId",
                table: "ReservationDetails",
                column: "StartOfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationDetails_UserId",
                table: "ReservationDetails",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rate");

            migrationBuilder.DropTable(
                name: "ReservationDetails");

            migrationBuilder.DropTable(
                name: "CarInfo");

            migrationBuilder.DropTable(
                name: "OfficeDetail");

            migrationBuilder.DropTable(
                name: "UserDetails");

            migrationBuilder.DropTable(
                name: "RentService");
        }
    }
}
