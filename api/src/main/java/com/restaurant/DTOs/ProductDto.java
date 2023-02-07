package com.restaurant.DTOs;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ProductDto {

    public final int CARACT_MIN = 3;
    public final int CARACT_MAX = 255;
    
    private Long id;
    
    @NotNull(message = "THE NAME MUST NOT BE NULL")
    @Size(min = CARACT_MIN, max = CARACT_MAX, message = "THE NAME SIZE MUST BE BETWEEN " + CARACT_MIN + " y " + CARACT_MAX + " CHARACTERS")
    private String name;

    @NotNull(message = "THE DESCRIPTION MUST NOT BE NULL")
    @Size(min = CARACT_MIN, max = CARACT_MAX, message = "THE DESCRIPTION SIZE MUST BE BETWEEN " + CARACT_MIN + " y " + CARACT_MAX + " CHARACTERS")
    private String description;

    @Min(0)
    @NotNull(message = "THE PRICE MUST NOT BE NULL")
    private Integer price;

    @Min(0)
    @NotNull(message = "THE STOCK MUST NOT BE NULL")
    private Integer stock;

    @NotNull(message = "THE IMAGE MUST NOT BE NULL") 
    @NotBlank(message = "THE IMAGE MUST NOT BE BLANK")
    private String image;


}
