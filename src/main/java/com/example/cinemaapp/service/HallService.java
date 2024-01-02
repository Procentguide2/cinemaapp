package com.example.cinemaapp.service;

import com.example.cinemaapp.model.Hall;
import com.example.cinemaapp.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HallService {
    @Autowired
    HallRepository repository;

    public Hall findById(int id){
        return repository.findById(id).get();
    }

    public List<Hall> findAll(){
        return repository.findAll();
    }

    public Hall saveHall(Hall hall){
        return repository.save(hall);
    }
    public void deleteHall(int id){
        Hall toDelete = findById(id);
        repository.delete(toDelete);
    }
}
