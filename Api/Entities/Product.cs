﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    public string Image { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}
