package com.example.cinemaapp.controller;

import com.example.cinemaapp.dto.HallDto;
import com.example.cinemaapp.dto.HallDtoId;
import com.example.cinemaapp.model.Hall;
import com.example.cinemaapp.service.HallService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class HallController {

    @Autowired
    HallService hallService;

    @GetMapping("/halls")
    @Operation(summary = "Get all halls")
    public List<HallDtoId> getHalls(){
        return hallService.findAll();
    }

    @GetMapping("/halls/{id}")
    @Operation(summary = "Get hall by id")
    public HallDto getHall(@PathVariable int id){
        return hallService.findDtoById(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Create hall", description = "Create hall in database(need JWT)")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/halls/create")
    public void createHall(@RequestBody HallDto hall){
        hallService.saveHall(hall);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Delete hall", description = "Delete hall in database by id(need JWT")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/halls/{id}")
    public void deleteHall(@PathVariable int id){
        hallService.deleteHall(id);
    }
}
