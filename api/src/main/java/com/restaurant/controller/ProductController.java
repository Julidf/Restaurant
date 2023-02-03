package com.restaurant.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.restaurant.DTOs.ProductDto;
import com.restaurant.models.Product;
import com.restaurant.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public Iterable<Product> getAllProducts() {
        return this.productService.findAll();
    }

    @GetMapping(path = "/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") Long id) {
        if (id < 0 || id == null) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Product> product = this.productService.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/admin/create-product")
    public ResponseEntity<Product> saveProduct(@Valid @RequestBody ProductDto productDto) {
        Product product = this.productService.mappingFromDto(productDto);
        this.productService.saveProduct(product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping(path = "/products/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable("id") Long id) {
        if (id < 0 || id == null) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Product> product = this.productService.findById(id);
        if (product.isPresent()) {
            this.productService.LogicDeleteById(product.get());
            return ResponseEntity.ok(product.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping(path = "/products/{id}")
    public ResponseEntity<Product> updateUserByFields(@PathVariable("id") Long id, @RequestBody Map<String, Object> fields) {
        if (id < 0 || id == null || fields.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Product> product = this.productService.findById(id);
        if (product.isPresent()){ 
            return ResponseEntity.ok(this.productService.updateProductByFields(product.get(), fields));
        }
        return ResponseEntity.notFound().build();
    }


}
