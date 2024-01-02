package com.example.cinemaapp.repository;

import com.example.cinemaapp.model.Hall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HallRepository extends JpaRepository<Hall, Integer> {

    Optional<Hall> findById(Integer id);
}