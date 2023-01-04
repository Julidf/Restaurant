package com.restaurant.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.restaurant.controller.ProductDto;
import com.restaurant.models.Product;
import com.restaurant.repository.ProductRepo;

import jakarta.persistence.EntityExistsException;

//Acá es donde se pone la logica previa de los CRUD antes de crear o borrar entidades.
//Hacen referencia a los metodos del repository (previamente habiendo inyectado la dependencia)

@Service
public class ProductService {

    private final ProductRepo productsRepository;

    @Autowired
    public ProductService(ProductRepo productsRepository) {
        this.productsRepository = productsRepository;
    }
    
    //Verifica que exista el producto en la BD; si no existe tira excepcion
    public Product verifyProduct(Long id) throws NoSuchElementException {
        return this.productsRepository.findById(id).orElseThrow(() -> new NoSuchElementException("The product with the id: " + id + " don't exists"));
    }
    
    //Trae todos los productos
    @Cacheable
    public Iterable<Product> findAll() {
        return this.productsRepository.findAll();
    }
    
    //Trae el producto segun su id
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

    // public void deleteById(Long id) {
    //     Optional<Product> product = this.findById(id);
        
    //     if (!product.isPresent()) {
    //         product.get().setIsAvailable(false);
    //     }
    // }
    
    public void updateWithPutById(Long id){
        Product product = this.verifyProduct(id);
        
    }
    
    public void updateWithPatchById(){
    
    }

}
