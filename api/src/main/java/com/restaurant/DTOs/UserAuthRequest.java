package com.restaurant.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UserAuthRequest {
    
    private String email;
    
    String password;

}