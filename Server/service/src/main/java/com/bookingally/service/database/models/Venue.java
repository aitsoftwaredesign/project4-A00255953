package com.bookingally.service.database.models;

import javax.persistence.GeneratedValue;
import javax.persistence.ManyToOne;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;

/**
 * A persistence entity that represents data from the 'venue' table in the schema.
 * @author Nicholas Murray
 */
@Entity
@Table(name = "venue")
public class Venue {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "venue_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "partner_id")
    private Partner partner;

    @Column(name = "venue_name")
    private String name;

    @Column(name = "venue_description")
    private String description;

    @Column(name = "venue_type")
    private String venueType;

    @Column(name = "address1")
    private String address1;

    @Column(name = "address2")
    private String address2;

    @Column(name = "town")
    private String town;

    public Venue() {
    }

    public Venue(String name, String description, String venueType, String address1, String address2, String town) {
        setName(name);
        setDescription(description);
        setVenueType(venueType);
        setAddress1(address1);
        setAddress2(address2);
        setTown(town);

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Partner getPartner() {
        return partner;
    }

    public void setPartner(Partner partner) {
        this.partner = partner;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setVenueType(String venueType) {
        this.venueType = venueType;
    }

    public String getVenueType() {
        return venueType;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getAddress2() {
        return address2;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getTown() {
        return town;
    }

}
