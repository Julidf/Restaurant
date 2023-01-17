package com.restaurant.models;

import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import lombok.Data;

@Data
@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long user_id;

    @ManyToMany
    private List<Product> products;

    public Cart(){
        this.products = new ArrayList<>();
    }

    public Cart(Long user_id) {
        this.user_id = user_id;
        this.products = new ArrayList<>();
    }

}