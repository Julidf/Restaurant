package com.restaurant.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.DTOs.UserAuthRequest;
import com.restaurant.DTOs.UserAuthResponse;
import com.restaurant.DTOs.UserRegisterRequest;
import com.restaurant.models.User;
import com.restaurant.service.AuthenticationService;
import com.restaurant.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class UserController {

    private final UserService userService;
    private final AuthenticationService authService;

    @Autowired
    public UserController(UserService userService, AuthenticationService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @GetMapping("/users")
    public Iterable<User> getAllUsers() {
        return this.userService.findAll();
    }

    @GetMapping(path = "/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        if (id < 0 || id == null) {
            return ResponseEntity.badRequest().build();
        }
        Optional<User> user = this.userService.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserAuthResponse> login(@Valid @RequestBody UserAuthRequest request) {
        Optional<User> user = this.userService.findByEmail(request.getEmail());
        if (!user.isPresent()) {
            return ResponseEntity.ok(
                UserAuthResponse.builder()
                .responseMessage("Email doesn't exist!")
                .build()
            );
        }
        return ResponseEntity.ok(this.authService.login(request, user.get()));
    }

    @PostMapping("/register")
    public ResponseEntity<UserAuthResponse> register(@Valid @RequestBody UserRegisterRequest request) {
        Optional<User> existUser = this.userService.findByEmail(request.getEmail());
        if (existUser.isPresent()) {
            return ResponseEntity.ok(
                UserAuthResponse.builder()
                .responseMessage("Email already exist!")
                .build()
                );
        }
        User user = authService.mappingFromRequest(request);
        return ResponseEntity.ok(this.authService.register(user));
    }

    @DeleteMapping(path = "/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {
        if (id < 0 || id == null) {
            return ResponseEntity.badRequest().build();
        }
        Optional<User> user = this.userService.findById(id);
        if (user.isPresent()){
            this.userService.deleteUser(user.get());
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping(path = "/users/{id}")
    public ResponseEntity<User> updateUserByFields(@PathVariable("id") Long id, @RequestBody Map<String, Object> fields) {
        if (id < 0 || id == null || fields.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Optional<User> user = this.userService.findById(id);
        if (user.isPresent()){ 
            return ResponseEntity.ok(this.userService.updateUserByFields(user.get(), fields));
        }
        return ResponseEntity.notFound().build();
    }



}
