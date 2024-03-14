package com.example.cinemaapp.controller;

import com.example.cinemaapp.dto.BookSeatForm;
import com.example.cinemaapp.dto.MovieSessionDto;
import com.example.cinemaapp.dto.MovieSessionDtoCreation;
import com.example.cinemaapp.dto.MovieSessionDtoId;
import com.example.cinemaapp.service.MovieSessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MovieSessionController {

    @Autowired
    MovieSessionService sessionService;

    @GetMapping("/sessions")
    @Operation(summary = "Get all sessions")
    public List<MovieSessionDtoId> getSessions(){
        return sessionService.findAll();
    }

    @GetMapping("/sessions/{id}")
    @Operation(summary = "Get session by id")
    public MovieSessionDto getSession(@PathVariable int id){
        return sessionService.getDtoById(id);
    }

    @GetMapping("/sessions/hall/{id}")
    @Operation(summary = "Get sessions by hall id")
    public List<MovieSessionDtoId> getSessionByHallId(@PathVariable int id){
        return sessionService.findAllByHallId(id);
    }

    @GetMapping("/sessions/movie/{id}")
    @Operation(summary = "Get sessions by movie id")
    public List<MovieSessionDtoId> getSessionByMovieId(@PathVariable int id){
        return sessionService.findAllByMovieId(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Create session", description = "Create session in database(need JWT)")
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/sessions/create")
    public void createSession(@RequestBody MovieSessionDtoCreation session){
        sessionService.saveSession(session);
    }

    @PostMapping("/sessions/book")
    public void BookSeat(@RequestBody BookSeatForm form) throws Exception {
        sessionService.bookSeat(form);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Delete session", description = "Delete session in database by id(need JWT")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/sessions/{id}")
    public void deleteSession(@PathVariable int id){
        sessionService.deleteSession(id);
    }
}
