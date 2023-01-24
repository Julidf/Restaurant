package com.restaurant.DTOs;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UserRegisterRequest {
    
    public final int CARACT_MIN = 5;
    public final int CARACT_MAX = 255;
    public final int PWD_CARACT_MAX = 25;
    

    @NotNull(message = "THE NAME MUST NOT BE NULL")
    @Size(min = CARACT_MIN, max = CARACT_MAX, message = "THE NAME SIZE MUST BE BETWEEN " + CARACT_MIN + " AND " + CARACT_MAX + " CHARACTERS")
    private String firstname;

    @NotNull(message = "THE LASTNAME MUST NOT BE NULL")
    @Size(min = CARACT_MIN, max = CARACT_MAX, message = "THE LASTNAME SIZE MUST BE BETWEEN " + CARACT_MIN + " AND " + CARACT_MAX + " CHARACTERS")
    private String lastname;

    @NotNull(message = "THE EMAIL MUST NOT BE NULL")
    @Size(min = CARACT_MIN, max = CARACT_MAX, message = "THE EMAIL SIZE MUST BE BETWEEN " + CARACT_MIN + " AND " + CARACT_MAX + " CHARACTERS")
    private String email;

    @NotNull(message = "THE PASSWORD MUST NOT BE NULL")
    @Size(min = CARACT_MIN, max = CARACT_MAX, message = "THE PASSWORD SIZE MUST BE BETWEEN " + CARACT_MIN + " AND " + PWD_CARACT_MAX + " CHARACTERS")
    private String password;

}
