package com.restaurant.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.restaurant.DTOs.ProductDto;
import com.restaurant.models.Product;
import com.restaurant.service.ProductService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping
public class ProductController {

    private final ProductService productsService;

    @Autowired
    public ProductController(ProductService productsService) {
        this.productsService = productsService;
    }

    @GetMapping("/products")
    public Iterable<Product> getAllProducts() {
        return this.productsService.findAll();
    }

    @GetMapping(path = "/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") Long id) {
        if (id < 0 || id == null) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Product> product = this.productsService.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/admin/create-product")
    public ResponseEntity<Product> saveProduct(@Valid @RequestBody ProductDto productDto) {
        Product product = this.productsService.mappingFromDto(productDto);
        this.productsService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping(path = "/products/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProductById(@PathVariable("id") Long id) {
        this.productsService.deleteById(id);
    }

    @PatchMapping(path = "/products/{id}")
    @Transactional
    public void updateWithPatchById(@PathVariable("id") Long id) {

    }

}
