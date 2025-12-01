namespace NeuronaTask.Server.Data.Entities;

public record PatientDb
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required int Age { get; init; }
    public required List<DiagnosisDb> Diagnoses { get; set; }
}