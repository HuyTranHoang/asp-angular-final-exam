using Api.Data;
using Api.Entities;
using Api.Responsitory.Interface;
using Microsoft.EntityFrameworkCore;

namespace Api.Responsitory;

public class CategoryRespository : ICategoryRespository
{
    private readonly ApiContext _context;
    public CategoryRespository(ApiContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetCategoriesAsync()
    {
        return await _context.Categories.ToListAsync();
    }
}
