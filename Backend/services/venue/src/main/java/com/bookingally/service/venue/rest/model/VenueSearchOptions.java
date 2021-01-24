package com.bookingally.service.venue.rest.model;

/**
This class is to be used for supplying search options to the venue resource to search for Venues that
match the given criteria
@author Nicholas Murray
 */
public class VenueSearchOptions {

    private String name;

    private String type;

    private String location;

    public VenueSearchOptions() {}

    public VenueSearchOptions(String name, String type, String location) {
        setName(name);
        setType(type);
        setLocation(location);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
