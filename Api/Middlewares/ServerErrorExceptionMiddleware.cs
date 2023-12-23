using System.Net;
using System.Text.Json;
using Api.Exceptions;

namespace Api.Middlewares;

public class ServerErrorExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ServerErrorExceptionMiddleware> _logger;
    private readonly IWebHostEnvironment _evn;

    public ServerErrorExceptionMiddleware(RequestDelegate next, ILogger<ServerErrorExceptionMiddleware> logger, IWebHostEnvironment evn)
    {
        _next = next;
        _logger = logger;
        _evn = evn;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{ExMessage}", ex.Message);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = _evn.IsDevelopment()
                ? new ApiException((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace?.ToString())
                : new ApiException((int)HttpStatusCode.InternalServerError);

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}