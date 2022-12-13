package com.restaurant.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.models.Product;
import com.restaurant.repository.ProductRepo;

//Acá es donde se pone la logica previa de los CRUD antes de crear o borrar
//entidades.
//Hacen referencia a los metodos del repository (previamente habiendo
//inyectado la dependencia)

@Service
public class ProductService {

    @Autowired
    private ProductRepo productsRepository;

    public Iterable<Product> findAll() {
        return this.productsRepository.findAll();
    }

    public void saveProduct(String code, String name, String description, int price, int stock) {
        Optional<Product> product = this.productsRepository.findByCode(code);

    }

}
