package com.example.cinemaapp.jwt;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;

    private final boolean adminFlag;

    public JwtResponse(String jwttoken, boolean adminFlag) {
        this.jwttoken = jwttoken;
        this.adminFlag = adminFlag;
    }

    public String getToken() {
        return this.jwttoken;
    }

    public boolean isAdminFlag() {
        return adminFlag;
    }
}
