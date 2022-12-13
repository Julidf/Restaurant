package com.restaurant.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.restaurant.models.Product;

//Aca van los metodos que tocan la BD directamente (salvar, buscar, borrar,
//contar). CRUD operations
@RepositoryRestResource
public interface ProductRepo extends CrudRepository<Product, Long> {

    public Optional<Product> findByCode(String code);

}