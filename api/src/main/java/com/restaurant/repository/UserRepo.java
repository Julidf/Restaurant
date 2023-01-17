package com.restaurant.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.restaurant.models.User;

@RepositoryRestResource
public interface UserRepo extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String email);

}
