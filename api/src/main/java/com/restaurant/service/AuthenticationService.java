package com.restaurant.service;

import java.util.HashMap;
import java.util.Map;

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

        Map<String, Object> extraClaims = new HashMap<String, Object>();
        extraClaims.putIfAbsent("role", user.getRole().getRoleName());

        String jwtToken = jwtService.generateToken(user, extraClaims);
        return UserAuthResponse.builder()
            .token(jwtToken)
            .build();
    }

    public UserAuthResponse register(UserRegisterRequest request) {
        User user = mappingFromRequest(request);
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
