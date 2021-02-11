package com.bookingally.service.venue.database.models;

import org.springframework.data.annotation.Id;

/**
 * A persistence entity that represents data from the service collection.
 * @author Nicholas Murray
 */
public class Service {

    @Id
    private String id;

    /**
     * The ID of the {@link Venue} that this service is offered in.
     */
    private String venueId;

    /**
     * The name of the service
     */
    private String name;

    /**
     * The description of the service for the customer to read.
     */
    private String description;

    /**
     * The cost of the service.
     */
    private float cost;

    /**
     * The length of time the service takes. Format HH:MM.
     */
    private String length;

    public Service() {}

    public Service(String venueID, String name, String description, float cost, String length) {
        setVenueId(venueID);
        setName(name);
        setDescription(description);
        setCost(cost);
        setLength(length);
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getVenueId() {
        return venueId;
    }

    public void setVenueId(String venueId) {
        this.venueId = venueId;
    }
}
