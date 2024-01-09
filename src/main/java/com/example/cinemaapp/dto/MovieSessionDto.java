package com.example.cinemaapp.dto;

import java.time.Instant;

public class MovieSessionDto {

    private Instant startDate;
    private Float cost;
    private Integer movieId;
    private Integer hallId;

    public MovieSessionDto() {
    }

    public MovieSessionDto(Instant startDate, Float cost, Integer movieId, Integer hallId) {
        this.startDate = startDate;
        this.cost = cost;
        this.movieId = movieId;
        this.hallId = hallId;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Float getCost() {
        return cost;
    }

    public void setCost(Float cost) {
        this.cost = cost;
    }

    public Integer getMovieId() {
        return movieId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public Integer getHallId() {
        return hallId;
    }

    public void setHallId(Integer hallId) {
        this.hallId = hallId;
    }
}
