package com.restaurant.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.restaurant.models.Cart;

@RepositoryRestResource
public interface CartRepo extends CrudRepository<Cart, Long> {


}
