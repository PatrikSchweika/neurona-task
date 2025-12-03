using FluentValidation;

using NeuronaTask.Server.GraphQL.Models;

namespace NeuronaTask.Server.GraphQL.Validators;

public class DiagnosisUpdateValidator : AbstractValidator<IEnumerable<DiagnosisUpdate>>
{
    public DiagnosisUpdateValidator()
    {
        RuleForEach(diagnoses => diagnoses).ChildRules(validator =>
        {
            validator.RuleFor(diagnosis => diagnosis.Title)
                .NotEmpty();

            validator.RuleFor(diagnosis => diagnosis.Description)
                .NotEmpty();

            validator.RuleFor(diagnosis => diagnosis.ImageUrl)
                .NotEmpty()
                .When(diagnosis => diagnosis.ImageUrl != null);
        });
    }
}