package com.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.repository.UserRepo;

@Service
public class UserService {
    
    private final UserRepo UserRepository;

    @Autowired
    public UserService(UserRepo UserRepository) {
        this.UserRepository = UserRepository;
    }



}
