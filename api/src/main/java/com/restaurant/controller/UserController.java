package com.restaurant.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/login")
    public ResponseEntity<UserAuthResponse> login(@Valid @RequestBody UserAuthRequest request) {
        Optional<User> user = this.userService.findByEmail(request.getEmail());
        if (!user.isPresent()) {
            return ResponseEntity.ok(
                UserAuthResponse.builder()
                .responseMessage("Email doesn't exist!")
                .responseStatus(401)
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
                .responseStatus(401)
                .build()
                );
        }
        User user = authService.mappingFromRequest(request);
        return ResponseEntity.ok(this.authService.register(user));
    }

}
