
// package com.restaurant.models;

// import java.util.ArrayList;

// import jakarta.persistence.Table;
// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;
// import jakarta.persistence.Column;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;

// import lombok.Data;

// @Data
// @Entity
// @Table(name = "user")
// public class User {

// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private Long id;

// @Column
// // Buscar como referenciar a la otra PK
// private Long roleId;

// @Column
// private String userName;

// @Column
// private String password;

// @Column
// private String firstName;

// @Column
// private String lastName;

// @Column
// private String email;

// public User(Long roleId, String userName, String password, String firstName,
// String lastName, String email) {
// this.roleId = roleId;
// this.userName = userName;
// this.password = password;
// this.firstName = firstName;
// this.lastName = lastName;
// this.email = email;
// }

// }
