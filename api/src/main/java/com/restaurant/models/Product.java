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
    private String name;

    @Column
    private String description;

    @Column
    private Integer price;

    @Column
    private Integer stock;

    @Column
    private Boolean isAvailable;

    @Column
    private String image;

    // Si modifico los atributos del product tengo que tambien modificar: el constructor, el mappeo y las validaciones

    public Product() {
        this.isAvailable = true;
    }

    public Product(String name, String description, Integer price, Integer stock, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.isAvailable = true;
    }


}
