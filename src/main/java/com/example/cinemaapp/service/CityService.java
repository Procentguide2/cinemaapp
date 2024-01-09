package com.example.cinemaapp.service;

import com.example.cinemaapp.model.City;
import com.example.cinemaapp.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {
    @Autowired
    CityRepository repository;

    public City findById(int id){
        return repository.findById(id).get();
    }

    public List<City> findAll(){
        return repository.findAll();
    }

    public City createCity(City city){
        return repository.save(city);
    }

    public City findByName(String name){
        return repository.findByCityName(name);
    }

    public boolean isCityExists(String cityName){
        boolean result;
        Optional<City> foundTheatre = Optional.ofNullable(findByName(cityName));
        result = foundTheatre.isPresent();
        return result;
    }

    public void deleteCity(int id){
        City toDelete = findById(id);
        repository.delete(toDelete);
    }
}
