using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using NeuronaTask.Server.Data.Entities;

namespace NeuronaTask.Server.Data.Configurations;

public class DiagnosisDbConfiguration : IEntityTypeConfiguration<DiagnosisDb>
{
    public void Configure(EntityTypeBuilder<DiagnosisDb> builder)
    {
        builder.HasKey(d => d.Id);

        builder.Property(d => d.Date).IsRequired();

        builder.Property(d => d.Description).IsRequired();

        builder.Property(d => d.ImageUrl);
    }
}