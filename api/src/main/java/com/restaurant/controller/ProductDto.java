package com.restaurant.controller;
import lombok.Data;

@Data
public class ProductDto {

    private Long id;
    private String name;
    private String description;
    private Float price;
    private Integer stock;
    private String image; 


}
