package com.example.cinemaapp.repository;

import com.example.cinemaapp.model.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TheatreRepository extends JpaRepository<Theatre, Integer> {

    Optional<Theatre> findById(Integer id);
    List<Theatre> findAllByCityId(Integer cityId);
}