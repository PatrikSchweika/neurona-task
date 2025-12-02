namespace NeuronaTask.Server.GraphQL.Models;

public record DiagnosisCreate
{
    public required DateTime Date { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public string? ImageUrl { get; init; }
}

public record PatientCreate
{
    public required string Name { get; init; }
    public required int Age { get; init; }
    public IEnumerable<DiagnosisCreate> Diagnoses { get; init; } = [];
}