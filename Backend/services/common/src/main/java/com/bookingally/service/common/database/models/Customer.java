package com.bookingally.service.common.database.models;

/**
 * A persistence entity that represents data from the accounts collection of type customer.
 * @author Nicholas Murray
 */
public class Customer extends Account {

    public Customer() {}

    public Customer(String firstname, String lastname, String userName, String password, String email) {
        setFirstname(firstname);
        setLastname(lastname);
        setUsername(userName);
        setPassword(password);
        setEmail(email);
    }
}
