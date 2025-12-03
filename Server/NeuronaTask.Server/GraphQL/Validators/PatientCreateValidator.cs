using FluentValidation;

using NeuronaTask.Server.GraphQL.Models;

namespace NeuronaTask.Server.GraphQL.Validators;

public class PatientCreateValidator : AbstractValidator<PatientCreate>
{
    public PatientCreateValidator()
    {
        RuleFor(p => p.Name).NotEmpty();
        RuleFor(p => p.Age).GreaterThan(0);
        RuleForEach(p => p.Diagnoses).SetValidator(new DiagnosisCreateValidator());
    }

}