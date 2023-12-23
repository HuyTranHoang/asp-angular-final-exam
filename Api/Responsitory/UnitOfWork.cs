using Api.Data;
using Api.Responsitory.Interface;

namespace Api.Responsitory;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApiContext _context;
    public UnitOfWork(ApiContext context)
    {
        _context = context;
    }

    public IProductRespository ProductRespository => new ProductRespository(_context);

    public ICategoryRespository CategoryRespository => new CategoryRespository(_context);

    public async Task<bool> SaveAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
