package com.bookingally.service.database.models;

import org.springframework.data.annotation.Id;

/**
 * A persistence entity that represents data from the partner collection.
 * @author Nicholas Murray
 */
public class Partner {

    @Id
    private String id;

    private String name;

    public Partner() {}

    public Partner(String name) {
        setName(name);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
