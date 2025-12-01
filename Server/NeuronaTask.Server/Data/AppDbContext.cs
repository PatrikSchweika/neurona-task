using Microsoft.EntityFrameworkCore;

using NeuronaTask.Server.Data.Entities;
using NeuronaTask.Server.GraphQL;

namespace NeuronaTask.Server.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<PatientDb> Patients { get; set; }
    public DbSet<DiagnosisDb> Diagnoses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}