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
        return repository.findById(id).get();
    }

    public List<Theatre> findAll(){
        return repository.findAll();
    }

    public Theatre saveTheatre(Theatre theatre){
        return repository.save(theatre);
    }

    public List<Theatre> findAllByCityId(int cityId){
        return repository.findAllByCityId(cityId);
    }
    public void deleteTheatre(int id){
        Theatre toDelete = findById(id);
        repository.delete(toDelete);
    }
}
