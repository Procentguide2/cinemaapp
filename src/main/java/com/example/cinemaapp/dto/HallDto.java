package com.example.cinemaapp.dto;

public class HallDto {

    String name;
    Integer seats;
    Integer theatreId;

    public HallDto() {
    }

    public HallDto(String name, Integer seats, Integer theatreId) {
        this.name = name;
        this.seats = seats;
        this.theatreId = theatreId;
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
}
