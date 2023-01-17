package com.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.DTOs.UserAuthRequest;
import com.restaurant.DTOs.UserAuthResponse;
import com.restaurant.DTOs.UserRegisterRequest;
import com.restaurant.service.AuthenticationService;
import com.restaurant.service.UserService;

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

    @PostMapping("/login")
    public ResponseEntity<UserAuthResponse> login(@RequestBody UserAuthRequest request) {
        if (!userService.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(this.authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<UserAuthResponse> register(@RequestBody UserRegisterRequest request) {
        if (userService.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(this.authService.register(request));
    }

}
