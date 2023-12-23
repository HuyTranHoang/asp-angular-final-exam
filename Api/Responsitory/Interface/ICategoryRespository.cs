using Api.Entities;

namespace Api.Responsitory.Interface;

public interface ICategoryRespository
{
    Task<IEnumerable<Category>> GetCategoriesAsync();
}
