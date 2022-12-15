package com.restaurant.models;

import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    private String code;

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

    public Product(String code, String name, String description, Float price, Integer stock, String image) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.image = image;
    }

}
