package com.bookingally.service.common;

public enum AccountTypes {

    PARTNER("Partner"),
    CUSTOMER("Customer");

    private final String label;

    private AccountTypes(String label){
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
