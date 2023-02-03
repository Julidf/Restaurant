package com.restaurant.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UserAuthResponse {

    private String token;
    private String responseMessage;
    
}
