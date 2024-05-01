package com.example.cinemaapp.dto;

public class TheatreDtoCreation {

    private String theatreName;
    private Integer cityId;
    private String address;

    public TheatreDtoCreation() {
    }

    public TheatreDtoCreation(String theatreName, Integer cityId, String address) {
        this.theatreName = theatreName;
        this.cityId = cityId;
        this.address = address;
    }

    public String getTheatreName() {
        return theatreName;
    }

    public void setTheatreName(String theatreName) {
        this.theatreName = theatreName;
    }

    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
