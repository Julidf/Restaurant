package com.restaurant.service;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.restaurant.models.User;
import com.restaurant.repository.CartRepo;
import com.restaurant.repository.UserRepo;

@Service
public class UserService implements UserDetailsService{
    
    private final CartRepo cartRepository;
    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo userRepository, CartRepo cartRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
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

    public Optional<User> findById(Long id) {
        return this.userRepository.findById(id);
    }

    public User saveUser(User user) {
        this.cartRepository.save(user.getCart());
        return this.userRepository.save(user);
    }

    public void deleteUser(User user) {
        user.setIsEnabled(false);
        this.saveUser(user);
    }

    public User updateUserByFields(User user, Map<String, Object> fields) {
        fields.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(User.class, key);
            if (field != null){
                field.setAccessible(true);
                if (field.getName() == "password"){
                    user.setPassword(this.passwordEncoder.encode(value.toString()));
                } else {
                    ReflectionUtils.setField(field, user, value);
                }
            }
        });
        return this.saveUser(user);
    }
    

}
