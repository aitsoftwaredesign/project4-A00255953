package com.bookingally.service.models;

public class Venue {

    private String name;
    private String description;
    private String venueType;

    public Venue(String name, String description, String venueType) {
        setName(name);
        setDescription(description);
        setVenueType(venueType);
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setVenueType(String venueType) {
        this.venueType = venueType;
    }

    public String getVenueType() {
        return venueType;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

}
