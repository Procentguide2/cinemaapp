package com.example.cinemaapp.dto;

import java.time.Instant;

public class MovieSessionDtoId extends MovieSessionDto{

    Integer id;

    public MovieSessionDtoId() {
    }


    public MovieSessionDtoId(Instant startDate, Float cost, String availableSeats, Integer totalSeats, Integer movieId, Integer hallId, Integer id) {
        super(startDate, cost, availableSeats, totalSeats, movieId, hallId);
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
