using Api.Dtos;
using Api.Entities;
using Api.Responsitory.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class CategoriesController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CategoriesController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    {
        var categories = await _unitOfWork.CategoryRespository.GetCategoriesAsync();

        var categoryDtos = _mapper.Map<IEnumerable<CategoryDto>>(categories);

        return Ok(categoryDtos);
    }
}