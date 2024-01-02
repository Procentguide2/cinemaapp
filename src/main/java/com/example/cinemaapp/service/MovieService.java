package com.example.cinemaapp.service;

import com.example.cinemaapp.model.Movie;
import com.example.cinemaapp.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    MovieRepository repository;

    public Movie findById(int id){
        return repository.findById(id).get();
    }

    public List<Movie> findAll(){
        return repository.findAll();
    }

    public Movie saveMovie(Movie movie){
        return repository.save(movie);
    }
    public void deleteMovie(int id){
        Movie toDelete = findById(id);
        repository.delete(toDelete);
    }
}
