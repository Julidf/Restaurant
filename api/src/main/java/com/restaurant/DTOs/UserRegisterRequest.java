package com.restaurant.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UserRegisterRequest {
    
    private String firstname;
    private String lastname;
    private String email;
    private String password;

}
