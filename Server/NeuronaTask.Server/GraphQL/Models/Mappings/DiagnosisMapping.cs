using NeuronaTask.Server.Data.Entities;

namespace NeuronaTask.Server.GraphQL.Models.Mappings;

public static class DiagnosisMapping
{
    public static Diagnosis ToDto(this DiagnosisDb diagnosis)
    {
        return new Diagnosis
        {
            Id = diagnosis.Id,
            Date = diagnosis.Date,
            Description = diagnosis.Description,
            ImageUrl = diagnosis.ImageUrl
        };
    }
}