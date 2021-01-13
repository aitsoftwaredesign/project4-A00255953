package com.bookingally.service.venue.database.models;

import org.springframework.data.annotation.Id;

/**
 * A persistence entity that represents data from venue collection.
 * @author Nicholas Murray
 */
public class Venue {

    @Id
    private String id;

    private String partnerId;

    private String name;

    private String description;

    private String venueType;

    private String address1;

    private String address2;

    private String town;

    private String postCode;

    private String image;

    public Venue() {}

    public Venue(String id, String partnerId, String name, String description, String venueType, String address1, String address2, String town) {
        setPartnerId(partnerId);
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

    public String getPartnerId() {
        return partnerId;
    }

    public void setPartnerId(String partnerId) {
        this.partnerId = partnerId;
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

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }
}
