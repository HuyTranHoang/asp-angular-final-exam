﻿using Api.Dtos;
using Api.Entities;
using AutoMapper;

namespace Api.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Product, ProductDto>();
        CreateMap<Category, CategoryDto>();
    }

}
