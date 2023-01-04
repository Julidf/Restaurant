package com.restaurant.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.restaurant.models.Product;
import com.restaurant.service.ProductService;

import jakarta.transaction.Transactional;

// Aca se hacen los http methods (get, put, post and delete methods) con sus endpoints.
// Hacen referencia a los metodos del service (previamente habiendo inyectado la dependencia)
// Acá tambien se validan los datos de entrada

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {

    private final ProductService productsService;

    @Autowired
    public ProductController(ProductService productsService) {
        this.productsService = productsService;
    }
    
    @GetMapping
    public Iterable<Product> getAllProducts() {
        return this.productsService.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
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
    
    // @PostMapping
    // @ResponseStatus(HttpStatus.CREATED)
    // public void saveProduct(String code, String name, String description, Float price, Integer stock, String image) {
    //     this.productsService.save(code, name, description, price, stock, image);
    // }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public void saveProduct2(@RequestBody ProductDto productDto) {
        this.productsService.save(productDto.getId(), productDto.getCode(), productDto.getName(), productDto.getDescription(), productDto.getPrice(), productDto.getStock(), productDto.getImage());
    }

    @DeleteMapping(path = "/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProductById(@PathVariable("productId") Long id) {
        this.productsService.deleteById(id);
    }
    
    // @PutMapping("/{id}")
    // @Transactional
    // public void updateProductWithPutById() {
    
    // }
    
    // @PatchMapping
    // @Transactional
    // public void updateWithPatchById() {
    
    // }

}
