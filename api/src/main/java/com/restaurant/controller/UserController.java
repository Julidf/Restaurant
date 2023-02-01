package com.restaurant.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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

    @GetMapping("/admin/users")
    public Iterable<User> getAllUsers() {
        return this.userService.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<UserAuthResponse> login(@Valid @RequestBody UserAuthRequest request) {
        Optional<User> user = this.userService.findByEmail(request.getEmail());
        if (!user.isPresent()) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(this.authService.login(request, user.get()));
    }

    @PostMapping("/register")
    public ResponseEntity<UserAuthResponse> register(@Valid @RequestBody UserRegisterRequest request) {
        Optional<User> existUser = this.userService.findByEmail(request.getEmail());
        if (existUser.isPresent()) {
            return ResponseEntity.ok().build();
        }
        User user = authService.mappingFromRequest(request);
        return ResponseEntity.ok(this.authService.register(user));
    }

    @PatchMapping(path = "/admin/delete/{userId}")
    public ResponseEntity<User> deleteEntity(@PathVariable("userId") Long id) {
        Optional<User> user = this.userService.findById(id);
        if (user.isPresent()){
            user.get().setIsEnabled(false);
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.badRequest().build();
    }

}
