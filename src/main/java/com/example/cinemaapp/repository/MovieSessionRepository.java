package com.example.cinemaapp.repository;

import com.example.cinemaapp.model.MovieSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieSessionRepository extends JpaRepository<MovieSession, Integer> {
}