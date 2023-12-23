using Api.Data;
using Api.Entities;
using Api.Helpers;
using Api.Responsitory.Interface;
using Microsoft.EntityFrameworkCore;

namespace Api.Responsitory;

public class ProductRespository : IProductRespository
{
    private readonly ApiContext _context;
    public ProductRespository(ApiContext context)
    {
        _context = context;
    }

    public void CreateProductAsync(Product product)
    {
        _context.Products.Add(product);
    }

    public void DeleteProductAsync(Product product)
    {
        _context.Products.Remove(product);
    }

    public Task<int> CountAsync(ProductRequestParams requestParams)
    {
        var query = _context.Products.AsQueryable();

        query = BuildQuery(query, requestParams);

        return query.CountAsync();
    }

    public async Task<Product> GetProductByIdAsync(int id)
    {
        return await _context.Products.FindAsync(id);
    }

    public async Task<IEnumerable<Product>> GetProductsAsync()
    {
        return await _context.Products.ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetProductsWithCategoryAsync(ProductRequestParams requestParams)
    {
        var query = _context.Products.Include(p => p.Category).AsQueryable();

        query = BuildQuery(query, requestParams);

        if (requestParams.PageNumber != 0 && requestParams.PageSize != 0)
        {
            query = query.Skip((requestParams.PageNumber - 1) * requestParams.PageSize).Take(requestParams.PageSize);
        }

        return await query.ToListAsync();
    }

    public void UpdateProductAsync(Product product)
    {
        _context.Entry(product).State = EntityState.Modified;
    }

    private IQueryable<Product> BuildQuery(IQueryable<Product> query,ProductRequestParams requestParams)
    {
        if (!string.IsNullOrEmpty(requestParams.SearchTerm))
        {
            query = query.Where(p => p.Name.Contains(requestParams.SearchTerm));
        }

        if (requestParams.CategoryId != 0)
        {
            query = query.Where(p => p.CategoryId == requestParams.CategoryId);
        }

        query = requestParams.Sort switch
        {
            "priceAsc" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            _ => query.OrderBy(p => p.Name)
        };

        return query;
    }
}
