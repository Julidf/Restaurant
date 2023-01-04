package com.restaurant.models;

import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import com.restaurant.controller.ProductDto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private Float price;

    @Column
    private Integer stock;

    @Column
    private Boolean isAvailable = true;

    @Column
    private String image; 

    public Product() {

    }

    public Product(String name, String description, Float price, Integer stock, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.image = image;
    }

    public static Product fromDto(ProductDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImage(dto.getImage());
        return product;
    }


}
