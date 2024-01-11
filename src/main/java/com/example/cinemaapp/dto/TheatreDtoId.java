package com.example.cinemaapp.dto;

public class TheatreDtoId extends TheatreDto{

    Integer id;

    public TheatreDtoId(Integer id) {
        this.id = id;
    }

    public TheatreDtoId(String theatreName, String cityName, Integer cityId, String address, Integer id) {
        super(theatreName, cityName, cityId, address);
        this.id = id;
    }

    public TheatreDtoId() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
