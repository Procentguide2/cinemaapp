package com.example.cinemaapp.dto;

public class HallDtoId extends HallDto{

    int id;

    public HallDtoId(int id) {
        this.id = id;
    }

    public HallDtoId(String name, Integer seats, Integer theatreId, int id) {
        super(name, seats, theatreId);
        this.id = id;
    }

    public HallDtoId() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
