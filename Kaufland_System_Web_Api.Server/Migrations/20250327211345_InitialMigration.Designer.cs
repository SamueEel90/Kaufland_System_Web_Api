﻿// <auto-generated />
using Kaufland_Software.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Kaufland_System_Web_Api.Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250327211345_InitialMigration")]
    partial class InitialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Kaufland_Software.Server.Modely.Produkt", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Cena")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("DruhListovania")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EanKod")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Kategoria")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MaxZasoba")
                        .HasColumnType("int");

                    b.Property<int>("MinZasoba")
                        .HasColumnType("int");

                    b.Property<string>("Nazov")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PocetPredanych")
                        .HasColumnType("int");

                    b.Property<string>("Vyrobca")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Zasoba")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Produkty");
                });
#pragma warning restore 612, 618
        }
    }
}
