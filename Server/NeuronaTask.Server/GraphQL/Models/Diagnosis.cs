namespace NeuronaTask.Server.GraphQL.Models;

public record Diagnosis
{
    public required int Id { get; init; }
    public required DateTime Date { get; init; }
    public required string Description { get; init; }
    public string? ImageUrl { get; init; }
}