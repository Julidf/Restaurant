package com.restaurant.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

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
    
    public Optional<Product> findById(Long id) {
        return this.productsRepository.findById(id);
    }
    
    //Se fija que el producto no exista, y en caso de que no exista, lo crea y lo guarda
    public void save(Long id, String code, String name, String description, Float price, Integer stock, String image) throws RuntimeException {
        Optional<Product> product = this.productsRepository.findById(id);
    
        if (!product.isPresent()) {
            this.productsRepository.save(new Product(code, name, description, price, stock, image));
        } else {
            throw new EntityExistsException("The product with the id: " + id + " already exists");
        }
    }
    
    //Si no encuentra el producto ignora el delete
    public void deleteById(Long id) {
        Optional<Product> product = this.findById(id);
        product.get().setIsAvailable(false);
    }
    
    public void updateWithPutById(Long id){
        Product product = this.verifyProduct(id);
        
    }
    
    public void updateWithPatchById(){
    
    }

}
