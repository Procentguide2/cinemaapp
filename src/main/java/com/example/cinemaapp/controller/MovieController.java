package com.example.cinemaapp.controller;

import com.example.cinemaapp.model.Movie;
import com.example.cinemaapp.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MovieController {

    @Autowired
    MovieService movieService;

    @GetMapping("/movies")
    @Operation(summary = "Get all movies")
    public List<Movie> getMovies(){
        return movieService.findAll();
    }

    @GetMapping("/movies/{id}")
    @Operation(summary = "Get movie by id")
    public Movie getMovies(@PathVariable int id){
        return movieService.findById(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Create movie", description = "Create movie in database(need JWT)")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/movies/create")
    public Movie createMovie(@RequestBody Movie movie){
        return movieService.saveMovie(movie);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Delete movie", description = "Delete movie in database by id(need JWT")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/movies/{id}")
    public void deleteMovie(@PathVariable int id){
        movieService.deleteMovie(id);
    }

}
