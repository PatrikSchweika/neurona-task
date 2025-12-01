using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using NeuronaTask.Server.Data.Entities;

namespace NeuronaTask.Server.Data.Configurations;

public class PatientDbConfiguration : IEntityTypeConfiguration<PatientDb>
{
    public void Configure(EntityTypeBuilder<PatientDb> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name).IsRequired();

        builder.Property(p => p.Age).IsRequired();

        builder
            .HasMany(p => p.Diagnoses)
            .WithOne()
            .HasPrincipalKey(p => p.Id)
            .HasForeignKey(d => d.PatientId);
    }
}