package com.example.cinemaapp.service;

import com.example.cinemaapp.model.Hall;
import com.example.cinemaapp.model.Theatre;
import com.example.cinemaapp.repository.HallRepository;
import com.example.cinemaapp.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HallService {
    @Autowired
    HallRepository repository;

    public Hall findById(int id){
        return repository.getById(id);
    }

    public List<Hall> findAll(){
        return repository.findAll();
    }
}
