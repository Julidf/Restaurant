
package com.restaurant.models;

public enum Role {

    USER("ROLE_USER"), ADMIN("ROLE_ADMIN");

    private String roleName;

    Role (String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return this.roleName;
    }
}
