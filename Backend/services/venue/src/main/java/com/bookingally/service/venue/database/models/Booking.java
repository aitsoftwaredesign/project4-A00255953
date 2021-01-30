package com.bookingally.service.venue.database.models;

import java.util.Date;
import org.springframework.data.annotation.Id;

/**
 * A persistence entity that represents data from the booking collection.
 * @author Nicholas Murray
 */
public class Booking {

    @Id
    private String id;

    private String venueId;

    private String serviceId;

    private String customerId;

    private Date start;

    private Date end;

    public Booking() {}

    public Booking(String id, String venueId, String serviceId, String customerId, Date start, Date end) {
        setId(id);
        setVenueId(venueId);
        setCustomerId(customerId);
        setServiceId(serviceId);
        setStart(start);
        setEnd(end);
    }

    public String getVenueId() {
        return venueId;
    }

    public void setVenueId(String venueId) {
        this.venueId = venueId;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
