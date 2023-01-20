
package com.restaurant.models;

public enum Role {

    USER("USER"), ADMIN("ADMIN");

    private String roleName;

    Role (String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return this.roleName;
    }
}
