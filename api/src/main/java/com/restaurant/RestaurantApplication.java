package com.restaurant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@ComponentScan({ "com.restaurant", "com.restaurant.config" })
@SpringBootApplication
//(scanBasePackages = { "com.restaurant", "com.restaurant.something" })

public class RestaurantApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestaurantApplication.class, args);
	}


}