
package com.restaurant.models;

public enum Role {

    USER("USER"), ADMIN("ADMIN");

    private String role;

    Role (String role) {
        this.role = role;
    }

    public String getRole() {
        return this.role;
    }
}
