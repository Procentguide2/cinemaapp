package com.example.cinemaapp.repository;

import com.example.cinemaapp.model.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.validation.constraints.Size;
import java.util.List;
import java.util.Optional;

public interface TheatreRepository extends JpaRepository<Theatre, Integer> {

    Optional<Theatre> findById(Integer id);
    Theatre findByName(String name);

    Theatre findByNameAndCityId(@Size(max = 100) String name, Integer city_id);
    List<Theatre> findAllByCityId(Integer cityId);
}