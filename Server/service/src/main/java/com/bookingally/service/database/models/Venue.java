package com.bookingally.service.database.models;

import org.springframework.data.annotation.Id;

/**
 * A persistence entity that represents data from venue collection.
 * @author Nicholas Murray
 */
public class Venue {

    @Id
    private String id;

    private String partner_id;

    private String name;

    private String description;

    private String venueType;

    private String address1;

    private String address2;

    private String town;

    private String image;

    public Venue() {}

    public Venue(String partner_id, String name, String description, String venueType, String address1, String address2, String town) {
        setPartner_id(partner_id);
        setName(name);
        setDescription(description);
        setVenueType(venueType);
        setAddress1(address1);
        setAddress2(address2);
        setTown(town);

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPartner_id() {
        return partner_id;
    }

    public void setPartner_id(String partner_id) {
        this.partner_id = partner_id;
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

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }
}
