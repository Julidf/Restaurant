package com.restaurant.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UserRegisterRequest {
    
    public final int CARACT_MIN_PWD = 5;
    public final int CARACT_MIN_NAME = 2;
    public final int CARACT_MAX = 255;
    public final int CARACT_MAX_PWD = 25;
    

    @NotNull(message = "THE FIRST NAME MUST NOT BE NULL")
    @Size(min = CARACT_MIN_NAME, max = CARACT_MAX, message = "THE NAME SIZE MUST BE BETWEEN " + CARACT_MIN_NAME + " AND " + CARACT_MAX + " CHARACTERS")
    private String firstName;

    @NotNull(message = "THE LASTNAME MUST NOT BE NULL")
    @Size(min = CARACT_MIN_NAME, max = CARACT_MAX, message = "THE LASTNAME SIZE MUST BE BETWEEN " + CARACT_MIN_NAME + " AND " + CARACT_MAX + " CHARACTERS")
    private String lastName;

    @NotNull(message = "THE EMAIL MUST NOT BE NULL")
    @Size(min = CARACT_MIN_NAME, max = CARACT_MAX, message = "THE EMAIL SIZE MUST BE BETWEEN " + CARACT_MIN_NAME + " AND " + CARACT_MAX + " CHARACTERS")
    @Email
    private String email;

    @NotNull(message = "THE PASSWORD MUST NOT BE NULL")
    @Size(min = CARACT_MIN_PWD, max = CARACT_MAX, message = "THE PASSWORD SIZE MUST BE BETWEEN " + CARACT_MIN_PWD + " AND " + CARACT_MAX_PWD + " CHARACTERS")
    private String password;

}
