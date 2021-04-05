using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AirlineAPI.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompanyAbout",
                columns: table => new
                {
                    AvioCompID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AvioCompName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    AvioCompAddress = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    AvioCompAbout = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    AvioCompDestinations = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    AvioCompFastReservationDiscount = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    AvioCompSeats = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    AvioCompPrices = table.Column<string>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyAbout", x => x.AvioCompID);
                });

            migrationBuilder.CreateTable(
                name: "FlightsInfo",
                columns: table => new
                {
                    FlightID = table.Column<string>(nullable: false,type: "nvarchar(100)"),
                    From = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    To = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Departing = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Returning = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Baggage = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    ClassF = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Stops = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Price = table.Column<string>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightsInfo", x => x.FlightID);
                });

            migrationBuilder.CreateTable(
                name: "Friends",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Accepted = table.Column<bool>(nullable: false),
                    Removed = table.Column<bool>(nullable: false),
                    Added = table.Column<bool>(nullable: false),
                    UserEmail1 = table.Column<string>(nullable: false),
                    UserEmail2 = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friends", x => x.Id);
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
                name: "FlightInfo2",
                columns: table => new
                {
                    FlightID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    From = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    To = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Departing = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Returning = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Baggage = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    ClassF = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Stops = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Price = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    SeatsNumber = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    StartTime = table.Column<string>(nullable: false),
                    EndTime = table.Column<string>(nullable: false),
                    CompanyAboutAvioCompID = table.Column<int>(nullable: false),
                    UserDetailUserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightInfo2", x => x.FlightID);
                    table.ForeignKey(
                        name: "FK_FlightInfo2_CompanyAbout_CompanyAboutAvioCompID",
                        column: x => x.CompanyAboutAvioCompID,
                        principalTable: "CompanyAbout",
                        principalColumn: "AvioCompID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlightInfo2_UserDetails_UserDetailUserId",
                        column: x => x.UserDetailUserId,
                        principalTable: "UserDetails",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "flightRate",
                columns: table => new
                {
                    RateIdd = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserIdd = table.Column<int>(nullable: false),
                    FlightInfo2FlightID = table.Column<int>(nullable: false),
                    Ocena = table.Column<int>(nullable: false),
                    CompanyIdd = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_flightRate", x => x.RateIdd);
                    table.ForeignKey(
                        name: "FK_flightRate_FlightInfo2_FlightInfo2FlightID",
                        column: x => x.FlightInfo2FlightID,
                        principalTable: "FlightInfo2",
                        principalColumn: "FlightID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Seat",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Number2 = table.Column<int>(nullable: false),
                    Class2 = table.Column<string>(nullable: false),
                    Price = table.Column<int>(nullable: false),
                    Discount = table.Column<int>(nullable: false),
                    Taken = table.Column<bool>(nullable: false),
                    FlightInfo2Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seat_FlightInfo2_FlightInfo2Id",
                        column: x => x.FlightInfo2Id,
                        principalTable: "FlightInfo2",
                        principalColumn: "FlightID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FlightReservation",
                columns: table => new
                {
                    ReservationID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ReservedUserUserId = table.Column<int>(nullable: false),
                    ReservedSeatId = table.Column<int>(nullable: false),
                    ReservedFlightFlightID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightReservation", x => x.ReservationID);
                    table.ForeignKey(
                        name: "FK_FlightReservation_FlightInfo2_ReservedFlightFlightID",
                        column: x => x.ReservedFlightFlightID,
                        principalTable: "FlightInfo2",
                        principalColumn: "FlightID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlightReservation_Seat_ReservedSeatId",
                        column: x => x.ReservedSeatId,
                        principalTable: "Seat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlightReservation_UserDetails_ReservedUserUserId",
                        column: x => x.ReservedUserUserId,
                        principalTable: "UserDetails",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightInfo2_CompanyAboutAvioCompID",
                table: "FlightInfo2",
                column: "CompanyAboutAvioCompID");

            migrationBuilder.CreateIndex(
                name: "IX_FlightInfo2_UserDetailUserId",
                table: "FlightInfo2",
                column: "UserDetailUserId");

            migrationBuilder.CreateIndex(
                name: "IX_flightRate_FlightInfo2FlightID",
                table: "flightRate",
                column: "FlightInfo2FlightID");

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservation_ReservedFlightFlightID",
                table: "FlightReservation",
                column: "ReservedFlightFlightID");

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservation_ReservedSeatId",
                table: "FlightReservation",
                column: "ReservedSeatId");

            migrationBuilder.CreateIndex(
                name: "IX_FlightReservation_ReservedUserUserId",
                table: "FlightReservation",
                column: "ReservedUserUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Seat_FlightInfo2Id",
                table: "Seat",
                column: "FlightInfo2Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "flightRate");

            migrationBuilder.DropTable(
                name: "FlightReservation");

            migrationBuilder.DropTable(
                name: "FlightsInfo");

            migrationBuilder.DropTable(
                name: "Friends");

            migrationBuilder.DropTable(
                name: "Seat");

            migrationBuilder.DropTable(
                name: "FlightInfo2");

            migrationBuilder.DropTable(
                name: "CompanyAbout");

            migrationBuilder.DropTable(
                name: "UserDetails");
        }
    }
}
