using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Extensions;

public static class ApplicationBuilderExtensions
{
    public static async void MigrateAndSeedDatabase(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<ApiContext>();
            await context.Database.MigrateAsync();
            await Seed.SeedCategory(context);
            await Seed.SeedProduct(context);
        }
        catch (Exception ex)
        {
            var logger = services.GetService<ILogger<Program>>();
            logger.LogError(ex, "An error occured during migration");
        }
    }
}