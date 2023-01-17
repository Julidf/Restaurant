package com.restaurant.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restaurant.DTOs.UserAuthRequest;
import com.restaurant.DTOs.UserAuthResponse;
import com.restaurant.DTOs.UserRegisterRequest;
import com.restaurant.configuration.JwtService;
import com.restaurant.models.User;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthenticationService {
    
    private final UserService userService;
    private final CartService cartService;
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
        User user = mappingFromRequest(request);
        this.cartService.saveCart(user.getCart());
        this.userService.saveUser(user);
        String jwtToken = jwtService.generateToken(user);
        return UserAuthResponse.builder()
            .token(jwtToken)
            .build();
    }

    private User mappingFromRequest (UserRegisterRequest request) {
        User user = new User();
        user.setFirstName(request.getFirstname());
        user.setLastName(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return user;
    }
    
}
