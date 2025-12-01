namespace NeuronaTask.Server.GraphQL.Models;

public record PatientDetail
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required int Age { get; init; }
    public required IEnumerable<Diagnosis> Diagnoses { get; init; }
}