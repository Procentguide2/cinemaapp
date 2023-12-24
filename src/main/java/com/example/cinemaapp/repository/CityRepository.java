package com.example.cinemaapp.repository;

import com.example.cinemaapp.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Integer> {
}