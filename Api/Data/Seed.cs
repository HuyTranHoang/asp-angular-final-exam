using System.Text.Json;
using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public static class Seed
{
    public static async Task SeedCategory(ApiContext apiContext)
    {
        if (await apiContext.Categories.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/SeedData/categories.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var categories = JsonSerializer.Deserialize<List<Category>>(userData, options);

        apiContext.Categories.AddRange(categories);

        await apiContext.SaveChangesAsync();
    }

    public static async Task SeedProduct(ApiContext apiContext)
    {
        if (await apiContext.Products.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/SeedData/products.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var products = JsonSerializer.Deserialize<List<Product>>(userData, options);

        apiContext.Products.AddRange(products);

        await apiContext.SaveChangesAsync();
    }
}
