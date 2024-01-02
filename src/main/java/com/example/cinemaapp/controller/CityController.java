package com.example.cinemaapp.controller;

import com.example.cinemaapp.model.City;
import com.example.cinemaapp.service.CityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CityController {
    @Autowired
    CityService cityService;

    @GetMapping("/cities")
    @Operation(summary = "Get all cities")
    public List<City> getCities(){
        return cityService.findAll();
    }

    @GetMapping("/cities/{id}")
    @Operation(summary = "Get city by id")
    public City getCity(@PathVariable int id){
        return cityService.findById(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Create city", description = "Create city in database(need JWT)")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/cities/create")
    public City createCity(@RequestBody City city){
        return cityService.createCity(city);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Delete city", description = "Delete city in database by id(need JWT")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/cities/{id}")
    public void deleteCity(@PathVariable int id){
        cityService.deleteCity(id);
    }
}
