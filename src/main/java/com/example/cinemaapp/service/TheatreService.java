package com.example.cinemaapp.service;

import com.example.cinemaapp.dto.TheatreDto;
import com.example.cinemaapp.dto.TheatreDtoId;
import com.example.cinemaapp.model.City;
import com.example.cinemaapp.model.Theatre;
import com.example.cinemaapp.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TheatreService {
    @Autowired
    TheatreRepository repository;
    @Autowired
    CityService cityService;

    public TheatreDto getDtoById(int id) {
        Theatre theatre = findById(id);
        return new TheatreDto(theatre.getName(), theatre.getCity().getCityName(), theatre.getAddress());
    }

    public List<TheatreDtoId> findAll() {
        List<Theatre> theatres = repository.findAll();
        return toDtoList(theatres);
    }

    public void saveTheatre(TheatreDto theatreDto) throws Exception {

        if (isTheatreExist(theatreDto.getTheatreName())) {
            throw new Exception("theatre already exists");
        }

        Theatre theatre = new Theatre();
        theatre.setName(theatreDto.getTheatreName());
        theatre.setAddress(theatreDto.getAddress());

        Optional<City> foundCity = Optional.ofNullable(cityService.findByName(theatreDto.getCityName()));

        if (foundCity.isPresent()) {
            theatre.setCity(foundCity.get());
        } else {
            City city = new City();
            city.setCityName(theatreDto.getCityName());
            cityService.createCity(city);
            theatre.setCity(city);
        }
        repository.save(theatre);
    }

    public void updateTheatre(TheatreDto form, int idTheatre) {
        City city;
        Theatre theatre = findById(idTheatre);

        theatre.setAddress(form.getAddress());
        theatre.setName(form.getTheatreName());

        if (cityService.isCityExists(form.getCityName())) {
            city = cityService.findByName(form.getCityName());
            theatre.setCity(city);
        } else {
            city = new City();
            city.setCityName(form.getCityName());
            cityService.createCity(city);
            theatre.setCity(city);
        }

        repository.save(theatre);
    }

    public List<TheatreDtoId> findAllByCityId(int cityId) {
        List<Theatre> theatresDb = repository.findAllByCityId(cityId);
        return toDtoList(theatresDb);
    }

    public void deleteTheatre(int id) {
        Theatre toDelete = findById(id);
        repository.delete(toDelete);
    }

    public Theatre findById(int id) {
        return repository.findById(id).get();
    }

    private List<TheatreDtoId> toDtoList(List<Theatre> theatres) {
        List<TheatreDtoId> theatreDtos = new ArrayList<>();
        for (Theatre th : theatres) {
            TheatreDtoId theatreDto = new TheatreDtoId(th.getName(), th.getCity().getCityName(), th.getAddress(), th.getId());
            theatreDtos.add(theatreDto);
        }
        return theatreDtos;
    }


    private boolean isTheatreExist(String theatreName) {
        boolean result;
        Optional<Theatre> foundTheatre = Optional.ofNullable(repository.findByName(theatreName));
        result = foundTheatre.isPresent();
        return result;
    }
}
