package com.restaurant.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.restaurant.models.User;

@RepositoryRestResource
public interface UserRepo extends CrudRepository<User, Long> {


}
