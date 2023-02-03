package com.restaurant.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.restaurant.DTOs.ProductDto;
import com.restaurant.models.Product;
import com.restaurant.repository.ProductRepo;

@Service
public class ProductService {

    private final ProductRepo productsRepository;

    @Autowired
    public ProductService(ProductRepo productsRepository) {
        this.productsRepository = productsRepository;
    }
    
    public Product verifyProduct(Long id) throws NoSuchElementException {
        return this.productsRepository.findById(id).orElseThrow(() -> new NoSuchElementException("The product with the id: " + id + " doesn't exists"));
    }
    
    @Cacheable
    public Iterable<Product> findAll() {
        return this.productsRepository.findAll();
    }
    
    public Optional<Product> findById(Long id) {
        return this.productsRepository.findById(id);
    }

    public Product saveProduct(Product product) {
        return this.productsRepository.save(product);
    }
    
    //Si no encuentra el producto ignora el delete
    public void deleteById(Long id) {
        this.productsRepository.deleteById(id);
    }

    public void LogicDeleteById(Long id) {
        Optional<Product> product = this.findById(id);
        
        if (!product.isPresent()) {
            product.get().setIsAvailable(false);
        }
    }
    
    public void updateWithPatchById(Long id){
        //Product product = this.verifyProduct(id);
    }
    
    //Mapping a Product from a ProductDto
    public Product mappingFromDto(ProductDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImage(dto.getImage());
        return product;
    }
    
 

}
