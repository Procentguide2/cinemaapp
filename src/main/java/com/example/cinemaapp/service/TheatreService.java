package com.example.cinemaapp.service;

import com.example.cinemaapp.model.Theatre;
import com.example.cinemaapp.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TheatreService {
    @Autowired
    TheatreRepository repository;

    public Theatre findById(int id){
        return repository.getById(id);
    }

    public List<Theatre> findAll(){
        return repository.findAll();
    }
}
