package com.example.cinemaapp.dto;

public class HallDto {

    private String name;
    private Integer seats;
    private Integer theatreId;
    private String theatreName;

    public HallDto() {
    }

    public HallDto(String name, Integer seats, Integer theatreId, String theatreName) {
        this.name = name;
        this.seats = seats;
        this.theatreId = theatreId;
        this.theatreName = theatreName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public Integer getTheatreId() {
        return theatreId;
    }

    public void setTheatreId(Integer theatreId) {
        this.theatreId = theatreId;
    }

    public String getTheatreName() {
        return theatreName;
    }

    public void setTheatreName(String theatreName) {
        this.theatreName = theatreName;
    }
}
