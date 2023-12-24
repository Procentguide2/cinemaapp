package com.example.cinemaapp.service;

import com.example.cinemaapp.model.MovieSession;
import com.example.cinemaapp.model.Theatre;
import com.example.cinemaapp.repository.MovieSessionRepository;
import com.example.cinemaapp.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieSessionService {
    @Autowired
    MovieSessionRepository repository;

    public MovieSession findById(int id){
        return repository.getById(id);
    }

    public List<MovieSession> findAll(){
        return repository.findAll();
    }
}
