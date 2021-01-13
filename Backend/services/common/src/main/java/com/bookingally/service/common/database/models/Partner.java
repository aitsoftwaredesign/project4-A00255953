package com.bookingally.service.common.database.models;

/**
 * A persistence entity that represents data from the accounts collection of type partner
 * @author Nicholas Murray
 */
public class Partner extends Account {

    private String description;

    private String serviceType;

    public Partner(){}

    public Partner(String firstname, String lastname, String userName, String password, String email, String serviceType) {
        setFirstname(firstname);
        setLastname(lastname);
        setUsername(userName);
        setPassword(password);
        setEmail(email);
        setServiceType(serviceType);
    }

    public Partner(String firstname, String lastname, String userName, String password, String email, String serviceType, String description) {
        setFirstname(firstname);
        setLastname(lastname);
        setUsername(userName);
        setPassword(password);
        setEmail(email);
        setServiceType(serviceType);
        setDescription(description);
    }

    public void setDescription(String desc) {
        this.description = desc;
    }

    public String getDescription() {
        return this.description;
    }

    public void setServiceType(String type) {
        this.serviceType = type;
    }

    public String getServiceType() {
        return this.serviceType;
    }
}
