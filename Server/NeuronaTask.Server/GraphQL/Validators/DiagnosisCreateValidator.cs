using FluentValidation;

using NeuronaTask.Server.GraphQL.Models;

namespace NeuronaTask.Server.GraphQL.Validators;

public class DiagnosisCreateValidator : AbstractValidator<DiagnosisCreate>
{
    public DiagnosisCreateValidator()
    {
        RuleFor(diagnosis => diagnosis.Title).NotEmpty();
        RuleFor(diagnosis => diagnosis.Description).NotEmpty();

        RuleFor(diagnosis => diagnosis.ImageUrl)
            .NotEmpty()
            .When(diagnosis => diagnosis.ImageUrl != null);
    }
}