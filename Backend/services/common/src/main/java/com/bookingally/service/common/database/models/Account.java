package com.bookingally.service.common.database.models;

import org.springframework.data.annotation.Id;

/**
 * A persistence entity that represents data from the accounts collection.
 * @author Nicholas Murray
 */
public abstract class Account {

    @Id
    private String id;

    private String firstname;

    private String lastname;

    private String username;

    private String password;

    private String email;

    public Account() {}

    public Account(String firstname, String lastname, String userName, String password, String email) {
        setFirstname(firstname);
        setLastname(lastname);
        setUsername(userName);
        setPassword(password);
        setEmail(email);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String name) {
        this.username = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
}
