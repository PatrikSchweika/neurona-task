using FluentValidation;

namespace NeuronaTask.Server.GraphQL.Filters;

public class ValidationFilter : IErrorFilter
{
    public IError OnError(IError error)
    {
        if (error.Exception is ValidationException validationException)
        {
            var errorBuilder = ErrorBuilder.New()
                .SetMessage("Validation failed")
                .SetCode("VALIDATION_ERROR")
                .SetPath(error.Path);

            var validationErrors = validationException.Errors
                .Select(e => new
                {
                    Field = e.PropertyName,
                    Message = e.ErrorMessage,
                    AttemptedValue = e.AttemptedValue
                })
                .ToList();

            errorBuilder.SetExtension("errors", validationErrors);

            return errorBuilder.Build();
        }

        return error;
    }
}