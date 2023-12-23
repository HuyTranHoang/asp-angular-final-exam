﻿namespace Api.Dtos;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Image { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string CategoryName { get; set; }
}
