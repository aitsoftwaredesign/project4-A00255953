package com.bookingally.service.database.models;

import org.springframework.data.annotation.Id;

/**
 * A persistence entity that represents data from the partner collection.
 * @author Nicholas Murray
 */
public class Account {

    @Id
    private String id;

    private String username;

    private String password;

    private String type = "standard";

    public Account() {}

    public Account(String name, String password, String type) {
        setUsername(name);
        setPassword(password);
        setType(type);
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        if(type == "partner" || type == "standard") {
            this.type = type;
        }
    }

}
