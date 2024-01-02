package com.example.cinemaapp.repository;

import com.example.cinemaapp.model.MovieSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MovieSessionRepository extends JpaRepository<MovieSession, Integer> {

    Optional<MovieSession> findById(Integer id);
}