namespace Api.Helpers;

public class ProductRequestParams : PaginationParams
{
    public string SearchTerm { get; set; }
    public int CategoryId { get; set; }
    public string Sort { get; set; }
}
