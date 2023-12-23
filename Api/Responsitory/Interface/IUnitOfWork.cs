namespace Api.Responsitory.Interface;

public interface IUnitOfWork
{
    IProductRespository ProductRespository { get; }
    ICategoryRespository CategoryRespository { get; }
    Task<bool> SaveAsync();
}
