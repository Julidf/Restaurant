package com.restaurant.service;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

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

    public Product LogicDeleteById(Product product) {
        product.setIsAvailable(false);
        return this.productsRepository.save(product);
    }
    
    public Product updateProductByFields(Product product, Map<String, Object> fields) {
        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(Product.class, key);
            if (field != null){
                field.setAccessible(true);
                ReflectionUtils.setField(field, product, value);
            }
        });
        return this.saveProduct(product);
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
