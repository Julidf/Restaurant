package com.restaurant.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.restaurant.models.Role;

@RepositoryRestResource
public interface RoleRepo extends CrudRepository<Role, Long> {


}
