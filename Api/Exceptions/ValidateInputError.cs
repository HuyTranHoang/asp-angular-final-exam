namespace Api.Exceptions;

public class ValidateInputError: ApiResponse
{
    public IEnumerable<string> Errors { get; set; }

    public ValidateInputError(int statusCode, IEnumerable<string> errors) : base(statusCode)
    {
        Errors = errors;
    }

    public ValidateInputError(int statusCode, string error) : base(statusCode)
    {
        Errors = new List<string> { error };
    }
}