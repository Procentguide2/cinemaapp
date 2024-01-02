package com.example.cinemaapp.service;

import com.example.cinemaapp.model.MovieSession;
import com.example.cinemaapp.repository.MovieSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieSessionService {
    @Autowired
    MovieSessionRepository repository;

    public MovieSession findById(int id){
        return repository.findById(id).get();
    }

    public List<MovieSession> findAll(){
        return repository.findAll();
    }

    public MovieSession saveSession(MovieSession session){
        return repository.save(session);
    }
    public void deleteSession(int id){
        MovieSession toDelete = findById(id);
        repository.delete(toDelete);
    }
}
