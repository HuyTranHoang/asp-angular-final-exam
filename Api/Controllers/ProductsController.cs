using Api.Dtos;
using Api.Entities;
using Api.Exceptions;
using Api.Helpers;
using Api.Responsitory.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

public class ProductsController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IWebHostEnvironment _hostEnvironment;

    public ProductsController(IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment hostEnvironment)
    {
        _hostEnvironment = hostEnvironment;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<ProductDto>>> GetProducts([FromQuery] ProductRequestParams requestParams)
    {
        var products = await _unitOfWork.ProductRespository.GetProductsWithCategoryAsync(requestParams);

        var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);

        var productDtoList = productDtos.ToList();

        var count = await _unitOfWork.ProductRespository.CountAsync(requestParams);

        return Ok(new PagedList<ProductDto>(productDtoList, requestParams.PageNumber, requestParams.PageSize, count));

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _unitOfWork.ProductRespository.GetProductByIdAsync(id);

        if (product == null)
        {
            return NotFound(new ApiResponse(404));
        }

        var productToReturn = _mapper.Map<ProductDto>(product);

        return Ok(productToReturn);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct(int id, [FromForm] Product product,
    [FromForm] string oldImage,
    [FromForm] IFormFile file)
    {
        if (id != product.Id)
        {
            return BadRequest(new ApiResponse(400));
        }

        try
        {
            var wwwRootPath = _hostEnvironment.WebRootPath;
            if (file != null)
            {
                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);

                var productPath = Path.Combine(wwwRootPath, "images");

                // Delete image old image from wwwroot/image   
                if (product.Image != null && !product.Image.Contains("http"))
                {
                    var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "images", product.Image);
                    if (System.IO.File.Exists(imagePath))
                        System.IO.File.Delete(imagePath);
                }

                using (var fileStream = new FileStream(Path.Combine(productPath, fileName), FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                product.Image = fileName;
            }
            else
            {
                product.Image = oldImage;
            }

            _unitOfWork.ProductRespository.UpdateProductAsync(product);
            await _unitOfWork.SaveAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProductExists(id))
            {
                return NotFound(new ApiResponse(404));
            }
            else
            {
                throw new Exception("Error update product");
            }
        }

        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<Product>> PostProduct([FromForm] Product product, [FromForm] IFormFile file)
    {

        var wwwRootPath = _hostEnvironment.WebRootPath;
        if (file != null)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);

            var productPath = Path.Combine(wwwRootPath, "images");

            await using (var fileStream = new FileStream(Path.Combine(productPath, fileName), FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            product.Image = fileName;
        }
        else
        {
            product.Image = "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";
        }

        _unitOfWork.ProductRespository.CreateProductAsync(product);
        await _unitOfWork.SaveAsync();

        return CreatedAtAction("GetProduct", new { id = product.Id }, product);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _unitOfWork.ProductRespository.GetProductByIdAsync(id);
        if (product == null)
        {
            return NotFound();
        }

        // Delete image from wwwroot/image
        if (product.Image != null && !product.Image.Contains("http"))
        {
            var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "images", product.Image);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }

        _unitOfWork.ProductRespository.DeleteProductAsync(product);

        await _unitOfWork.SaveAsync();

        return NoContent();
    }

    private bool ProductExists(int id)
    {
        return _unitOfWork.ProductRespository.GetProductByIdAsync(id) != null;
    }
}
