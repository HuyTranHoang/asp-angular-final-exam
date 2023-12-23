using Api.Exceptions;
using Api.Responsitory.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class BuggyController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public BuggyController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    // 404 page not found


    // 401 unauthorized


    // 400 bad request
    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest(new ApiResponse(400));
    }

    // 400 validation error -- input string in the id field
    [HttpGet("bad-request/{id}")]
    public IActionResult GetValidationError(int id)
    {
        return Ok();
    }

    // 500 server error
    [HttpGet("server-error")]
    public async Task<IActionResult> GetServerError()
    {
        var thing = await _unitOfWork.ProductRespository.GetProductByIdAsync(9999);
        var thingToReturn = thing.ToString();
        return Ok();
    }
}