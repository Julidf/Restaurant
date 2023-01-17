package com.restaurant.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restaurant.DTOs.UserAuthRequest;
import com.restaurant.DTOs.UserAuthResponse;
import com.restaurant.DTOs.UserRegisterRequest;
import com.restaurant.configuration.JwtService;
import com.restaurant.models.Role;
import com.restaurant.models.User;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthenticationService {
    
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public UserAuthResponse login(UserAuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        User user = this.userService.findByEmail(request.getEmail()).get();
        String jwtToken = jwtService.generateToken(user);
        return UserAuthResponse.builder()
            .token(jwtToken)
            .build();
    }

    public UserAuthResponse register(UserRegisterRequest request) {
        User user = User.builder()
            .firstName(request.getFirstname())
            .lastName(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .build();

        this.userService.saveUser(user);
        String jwtToken = jwtService.generateToken(user);
        return UserAuthResponse.builder()
            .token(jwtToken)
            .build();
    }
    
}
