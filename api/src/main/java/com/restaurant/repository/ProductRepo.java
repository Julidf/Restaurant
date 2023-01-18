package com.restaurant.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.restaurant.models.Product;

@RepositoryRestResource
public interface ProductRepo extends CrudRepository<Product, Long> {


}