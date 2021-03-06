// <auto-generated />
using System;
using AirlineAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AirlineAPI.Migrations
{
    [DbContext(typeof(UserDetailContext))]
    partial class UserDetailContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("AirlineAPI.Models.CompanyAbout", b =>
                {
                    b.Property<int>("AvioCompID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AvioCompAbout")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("AvioCompAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("AvioCompDestinations")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("AvioCompFastReservationDiscount")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("AvioCompName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("AvioCompPrices")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("AvioCompSeats")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("AvioCompID");

                    b.ToTable("CompanyAbout");
                });

            modelBuilder.Entity("AirlineAPI.Models.FlightInfo", b =>
                {
                    b.Property<string>("FlightID")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("Baggage")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ClassF")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Departing")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Duration")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("From")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Price")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Returning")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Stops")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("To")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("FlightID");

                    b.ToTable("FlightsInfo");
                });

            modelBuilder.Entity("AirlineAPI.Models.FlightInfo2", b =>
                {
                    b.Property<int>("FlightID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Baggage")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ClassF")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("CompanyAboutAvioCompID")
                        .HasColumnType("int");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Departing")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Duration")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("EndTime")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("From")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Price")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Returning")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("SeatsNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("StartTime")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Stops")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("To")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int?>("UserDetailUserId")
                        .HasColumnType("int");

                    b.HasKey("FlightID");

                    b.HasIndex("CompanyAboutAvioCompID");

                    b.HasIndex("UserDetailUserId");

                    b.ToTable("FlightInfo2");
                });

            modelBuilder.Entity("AirlineAPI.Models.FlightReservation", b =>
                {
                    b.Property<int>("ReservationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ReservedFlightFlightID")
                        .HasColumnType("int");

                    b.Property<int>("ReservedSeatId")
                        .HasColumnType("int");

                    b.Property<int>("ReservedUserUserId")
                        .HasColumnType("int");

                    b.HasKey("ReservationID");

                    b.HasIndex("ReservedFlightFlightID");

                    b.HasIndex("ReservedSeatId");

                    b.HasIndex("ReservedUserUserId");

                    b.ToTable("FlightReservation");
                });

            modelBuilder.Entity("AirlineAPI.Models.Friends", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Accepted")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Added")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Removed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserEmail1")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UserEmail2")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("Friends");
                });

            modelBuilder.Entity("AirlineAPI.Models.Seat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Class2")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Discount")
                        .HasColumnType("int");

                    b.Property<int>("FlightInfo2Id")
                        .HasColumnType("int");

                    b.Property<int>("Number2")
                        .HasColumnType("int");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<bool>("Taken")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("FlightInfo2Id");

                    b.ToTable("Seat");
                });

            modelBuilder.Entity("AirlineAPI.Models.UserDetail", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<bool>("IsVerify")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LogOut")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("StringToken")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UserType")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("UserId");

                    b.ToTable("UserDetails");
                });

            modelBuilder.Entity("AirlineAPI.Models.flightRate", b =>
                {
                    b.Property<int>("RateIdd")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CompanyIdd")
                        .HasColumnType("int");

                    b.Property<int>("FlightInfo2FlightID")
                        .HasColumnType("int");

                    b.Property<int>("Ocena")
                        .HasColumnType("int");

                    b.Property<int>("UserIdd")
                        .HasColumnType("int");

                    b.HasKey("RateIdd");

                    b.HasIndex("FlightInfo2FlightID");

                    b.ToTable("flightRate");
                });

            modelBuilder.Entity("AirlineAPI.Models.FlightInfo2", b =>
                {
                    b.HasOne("AirlineAPI.Models.CompanyAbout", null)
                        .WithMany("CompanyFlights")
                        .HasForeignKey("CompanyAboutAvioCompID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AirlineAPI.Models.UserDetail", null)
                        .WithMany("UserFlights")
                        .HasForeignKey("UserDetailUserId");
                });

            modelBuilder.Entity("AirlineAPI.Models.FlightReservation", b =>
                {
                    b.HasOne("AirlineAPI.Models.FlightInfo2", "ReservedFlight")
                        .WithMany()
                        .HasForeignKey("ReservedFlightFlightID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AirlineAPI.Models.Seat", "ReservedSeat")
                        .WithMany()
                        .HasForeignKey("ReservedSeatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AirlineAPI.Models.UserDetail", "ReservedUser")
                        .WithMany()
                        .HasForeignKey("ReservedUserUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AirlineAPI.Models.Seat", b =>
                {
                    b.HasOne("AirlineAPI.Models.FlightInfo2", null)
                        .WithMany("Seats")
                        .HasForeignKey("FlightInfo2Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AirlineAPI.Models.flightRate", b =>
                {
                    b.HasOne("AirlineAPI.Models.FlightInfo2", null)
                        .WithMany("FlightRates")
                        .HasForeignKey("FlightInfo2FlightID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
