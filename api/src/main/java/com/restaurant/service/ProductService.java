package com.restaurant.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.restaurant.controller.ProductDto;
import com.restaurant.models.Product;
import com.restaurant.repository.ProductRepo;

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
        Product product = this.verifyProduct(id);
    }
 
    public boolean validateProduct(ProductDto productDto) {
        if (this.haveNullOrBlank(productDto)) {
            return false;
        } else if (!this.haveCorrectFormat(productDto)) {
            return false;
        } else if (!this.haveCorrectLength(productDto)){
            return false;
        }
        return true;
    }

    //Check if the attributes of the DTO contains a null or a blank
    //This check the incorrect way
    private boolean haveNullOrBlank(ProductDto productDto) {
        if (
            productDto.getName().isBlank() ||
            productDto.getDescription().isBlank() ||
            productDto.getPrice() == null ||
            productDto.getStock() == null ||
            productDto.getImage().isBlank())
        {
            return true;
        }    
        else {
            return false;
        }
    }

    //Check if the String atributtes of the DTO have correct formats and if the Integer are greater than 0 
    //This checks the correct way
    private boolean haveCorrectFormat(ProductDto productDto) {
        if (
            productDto.getName().matches("[a-zA-Z0-9 ]{1,255}") &&
            productDto.getDescription().matches("[a-zA-Z0-9 ]{1,255}") &&
            productDto.getPrice() > 0 && 
            productDto.getStock() > 0 && 
            productDto.getImage().matches("[a-zA-Z0-9:/. ]{1,255}")) 
        {
            return true;
        }
        else {
            return false;
        }
    }

    //Check if the String atributtes of the Dto have correct length
    //This checks the correct form way
    private boolean haveCorrectLength(ProductDto productDto) {
        if (
            productDto.getName().length() < 200 &&
            productDto.getDescription().length() < 999 &&
            productDto.getStock() < 9999) 
        {
            return true;
        }
        else {
            return false;
        }
    }


}
