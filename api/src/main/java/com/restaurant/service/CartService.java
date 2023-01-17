package com.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.models.Cart;
import com.restaurant.repository.CartRepo;

@Service
public class CartService {
    
    private final CartRepo cartRepository;

    @Autowired
    public CartService(CartRepo cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart saveCart(Cart cart) {
        return this.cartRepository.save(cart);
    }

}
