using NeuronaTask.Server.Data.Entities;

namespace NeuronaTask.Server.GraphQL.Models.Mappings;

public static class PatientMapping
{
    public static PatientListItem ToListItem(this PatientDb patient)
    {
        var lastDiagnosis = patient.Diagnoses.OrderByDescending(d => d.Date).FirstOrDefault();

        return new PatientListItem
        {
            Id = patient.Id,
            Name = patient.Name,
            Age = patient.Age,
            LastDiagnosis = lastDiagnosis?.ToDto()
        };
    }

    public static PatientDetail ToDetail(this PatientDb patient)
    {
        return new PatientDetail
        {
            Id = patient.Id,
            Name = patient.Name,
            Age = patient.Age,
            Diagnoses = patient.Diagnoses.Select(diagnosis => diagnosis.ToDto())
        };
    }
}