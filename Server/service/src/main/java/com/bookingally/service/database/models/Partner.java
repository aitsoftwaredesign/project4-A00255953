package com.bookingally.service.database.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * A persistence entity that represents data from the 'partner' table in the schema.
 * @author Nicholas Murray
 */
@Entity
@Table(name = "partner")
public class Partner {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "partner_id")
    private Integer id;

    @Column(name = "partner_name")
    private String name;

    public Partner() {
    }

    public Partner(String name) {
        setName(name);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
