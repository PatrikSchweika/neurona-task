namespace NeuronaTask.Server.Data.Entities;

public record DiagnosisDb
{
    public required int Id { get; init; }
    public required int PatientId { get; init; }

    public required DateTime Date { get; set; }
    public required string Description { get; set; }
    public string? ImageUrl { get; set; }
}