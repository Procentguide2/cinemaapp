package com.example.cinemaapp.controller;

import com.example.cinemaapp.model.City;
import com.example.cinemaapp.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CityController {
    @Autowired
    CityService cityService;

    @GetMapping("/cities")
    public List<City> getCities(){
        return cityService.findAll();
    }

    @GetMapping("/cities/{id}")
    public City getCity(@PathVariable int id){
        return cityService.findById(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/cities/create")
    public City createCity(@RequestBody City city){
        return cityService.createCity(city);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/cities/{id}")
    public void deleteCity(@PathVariable int id){
        cityService.deleteCity(id);
    }
}
