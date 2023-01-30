package com.restaurant.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.restaurant.models.User;
import com.restaurant.repository.CartRepo;
import com.restaurant.repository.UserRepo;

@Service
public class UserService implements UserDetailsService{
    
    private final CartRepo cartRepository;
    private final UserRepo userRepository;

    @Autowired
    public UserService(UserRepo userRepository, CartRepo cartRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository 
            .findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("The user with email: " + email + " doesn't exists"));
        return user;
    }

    @Cacheable
    public Iterable<User> findAll() {
        return this.userRepository.findAll();
    }

    public Optional<User> findByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        this.cartRepository.save(user.getCart());
        return this.userRepository.save(user);
    }
    

}
