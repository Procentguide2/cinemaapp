package com.example.cinemaapp.service;

import com.example.cinemaapp.model.Movie;
import com.example.cinemaapp.model.Theatre;
import com.example.cinemaapp.repository.MovieRepository;
import com.example.cinemaapp.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    MovieRepository repository;

    public Movie findById(int id){
        return repository.getById(id);
    }

    public List<Movie> findAll(){
        return repository.findAll();
    }
}
