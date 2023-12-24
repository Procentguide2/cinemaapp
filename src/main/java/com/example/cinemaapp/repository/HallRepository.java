package com.example.cinemaapp.repository;

import com.example.cinemaapp.model.Hall;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HallRepository extends JpaRepository<Hall, Integer> {
}