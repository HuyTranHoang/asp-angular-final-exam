using Api.Entities;
using Api.Helpers;


namespace Api.Responsitory.Interface;

public interface IProductRespository
{
    Task<IEnumerable<Product>> GetProductsAsync();
    Task<IEnumerable<Product>> GetProductsWithCategoryAsync(ProductRequestParams requestParams);
    Task<Product> GetProductByIdAsync(int id);
    void UpdateProductAsync(Product product);
    void CreateProductAsync(Product product);
    void DeleteProductAsync(Product product);

    Task<int> CountAsync(ProductRequestParams requestParams);
}
