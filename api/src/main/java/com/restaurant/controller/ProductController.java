package com.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.models.Product;
import com.restaurant.service.ProductService;

// Aca se hacen los http methods (get, put, post and delete methods) con sus
// endpoints.
// Hacen referencia a los metodos del service (previamente habiendo inyectado
// la dependencia)

@RestController
@RequestMapping
public class ProductController {

    @Autowired
    private ProductService productsService;

    @GetMapping
    public Iterable<Product> getAllProducts() {
        return this.productsService.findAll();
    }

}
