package com.restaurant.models;

import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
@Entity
@Table(name = "client")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String firstName;
    
    @Column
    private String lastName;
    
    @Column
    private String email;

    @Column
    private String password; 

    @Column
    private Boolean isEnabled;
    
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne
    private Cart cart;

    // Si modifico los atributos del User tengo que tambien modificar: el constructor, el mappeo, el DTO y las validaciones
    
    public User(){
        this.role = Role.ADMIN;
        this.isEnabled = true;
        this.cart = new Cart(this.id);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = this.getRole().getRoleName();
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
      return this.password;
    }

    @Override
    public String getUsername() {
      return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
