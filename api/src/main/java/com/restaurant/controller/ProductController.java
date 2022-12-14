package com.restaurant.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.restaurant.models.Product;
import com.restaurant.service.ProductService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;  

// Aca se hacen los http methods (get, put, post and delete methods) con sus endpoints.
// Hacen referencia a los metodos del service (previamente habiendo inyectado la dependencia)
// Acá tambien se validan los datos de entrada

@RestController
@RequestMapping("/products")
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
    
    @GetMapping(path = "/{id}")
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

    @PostMapping
    public ResponseEntity<Product> saveProduct(@Valid @RequestBody ProductDto productDto) {
        Product product = Product.fromDto(productDto);
        this.productsService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping(path = "/{productId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProductById(@PathVariable("productId") Long id) {
        this.productsService.deleteById(id);
    }
    
    @PatchMapping(path = "/{productId}")
    @Transactional
    public void updateWithPatchById(@PathVariable("productId") Long id) {
        
    }

}
