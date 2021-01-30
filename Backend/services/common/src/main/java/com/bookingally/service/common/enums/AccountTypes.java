package com.bookingally.service.common.enums;

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
