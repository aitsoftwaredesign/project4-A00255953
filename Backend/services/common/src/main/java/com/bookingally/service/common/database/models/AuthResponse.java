package com.bookingally.service.common.database.models;

import com.bookingally.service.common.AccountTypes;
import java.io.Serializable;

public class AuthResponse<T> implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwtToken;
    private String accountType;
    private Object account;

    public AuthResponse(String jwtToken){
        this.jwtToken = jwtToken;
    }

    public AuthResponse(String jwtToken, Object account, String accountType) {
        this.jwtToken = jwtToken;
        this.account = account;
        this.accountType = accountType;
    }

    public String getToken() {
        return this.jwtToken;
    }

    public Object getAccount() {
        return this.account;
    }

    public String getAccountType() {
        return accountType;
    }
}
