namespace NeuronaTask.Server.GraphQL.Models;

public record PatientListItem
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required int Age { get; init; }
    public Diagnosis? LastDiagnosis { get; init; }
}