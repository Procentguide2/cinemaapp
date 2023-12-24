package com.example.cinemaapp.controller;

import com.example.cinemaapp.model.City;
import com.example.cinemaapp.model.Movie;
import com.example.cinemaapp.repository.CityRepository;
import com.example.cinemaapp.repository.MovieRepository;
import com.example.cinemaapp.repository.TheatreRepository;
import net.datafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MainController {

    @Autowired
    CityRepository cityRepository;
    @Autowired
    MovieRepository movieRepository;
    @Autowired
    TheatreRepository theatreRepository;


    @GetMapping("/cities")
    public List<City> getCities(){
        return cityRepository.findAll();
    }





}
