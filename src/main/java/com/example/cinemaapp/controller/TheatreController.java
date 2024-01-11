package com.example.cinemaapp.controller;

import com.example.cinemaapp.dto.TheatreDto;
import com.example.cinemaapp.dto.TheatreDtoCreation;
import com.example.cinemaapp.dto.TheatreDtoId;
import com.example.cinemaapp.service.TheatreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TheatreController {

    @Autowired
    TheatreService theatreService;

    @GetMapping("/theatres")
    @Operation(summary = "Get all theatres")
    public List<TheatreDtoId> getTheatres(){
        return theatreService.findAll();
    }

    @GetMapping("/theatres/{id}")
    @Operation(summary = "Get theatre by id")
    public TheatreDto getTheatre(@PathVariable int id){
        return theatreService.getDtoById(id);
    }

    @GetMapping("/theatres/city/{id}")
    @Operation(summary = "Get theatres by city id")
    public List<TheatreDtoId> getByCityId(@PathVariable int id){
        return theatreService.findAllByCityId(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Create theatre", description = "Create theatre in database(need JWT)")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/theatres/create")
    public void createTheatre(@RequestBody TheatreDtoCreation theatre) throws Exception {
        theatreService.saveTheatre(theatre);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Update theatre", description = "Update theatre using id and data")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/theatres/update/{id}")
    public void updateTheatre(@RequestBody TheatreDtoCreation theatre, @PathVariable int id){
        theatreService.updateTheatre(theatre,id);

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Delete theatre", description = "Delete theatre in database by id(need JWT")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/theatres/{id}")
    public void deleteTheatre(@PathVariable int id){
        theatreService.deleteTheatre(id);
    }
}
