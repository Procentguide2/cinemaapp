package com.example.cinemaapp.dto;

import java.time.Instant;
import java.util.List;

public class MovieSessionDto {

    private Instant startDate;
    private Float cost;

    private List<Integer> availableSeats;

    private Integer totalSeats;
    private Integer movieId;
    private Integer hallId;

    public MovieSessionDto() {
    }

    public MovieSessionDto(Instant startDate, Float cost, List<Integer> availableSeats, Integer totalSeats, Integer movieId, Integer hallId) {
        this.startDate = startDate;
        this.cost = cost;
        this.availableSeats = availableSeats;
        this.totalSeats = totalSeats;
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

    public List<Integer> getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(List<Integer> availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Integer getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(Integer totalSeats) {
        this.totalSeats = totalSeats;
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
