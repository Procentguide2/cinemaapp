package com.example.cinemaapp.dto;

public class TheatreDto {

    private String theatreName;
    private String cityName;

    private String address;

    public TheatreDto() {
    }

    public TheatreDto(String theatreName, String cityName ,String address) {
        this.theatreName = theatreName;
        this.cityName = cityName;
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTheatreName() {
        return theatreName;
    }

    public void setTheatreName(String theatreName) {
        this.theatreName = theatreName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }
}
