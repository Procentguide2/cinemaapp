package com.example.cinemaapp.service;

import com.example.cinemaapp.dto.HallDto;
import com.example.cinemaapp.dto.HallDtoId;
import com.example.cinemaapp.model.Hall;
import com.example.cinemaapp.model.Theatre;
import com.example.cinemaapp.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HallService {
    @Autowired
    HallRepository repository;

    @Autowired
    TheatreService theatreService;

    public Hall findById(int id){
        return repository.findById(id).get();
    }

    public HallDto findDtoById(int id){
        Hall hall = findById(id);
        return new HallDto(hall.getName(),hall.getSeats(),hall.getTheatre().getId());
    }

    public List<HallDto> findDtoByTheatreId(int id){
        return findAll().stream().filter(hallDto -> id == hallDto.getTheatreId()).collect(Collectors.toList());
    }

    public List<HallDtoId> findAll(){
        List<Hall> halls = repository.findAll();
        List<HallDtoId> hallDtos = new ArrayList<>();

        for (Hall hall : halls){
            HallDtoId hallDtoId = new HallDtoId(hall.getName(),hall.getSeats(),hall.getTheatre().getId(),hall.getId());
            hallDtos.add(hallDtoId);
        }
        return hallDtos;
    }

    public void saveHall(HallDto hallDto) throws Exception {

        Optional<Hall> foundHall = Optional.ofNullable(repository.findByNameAndTheatreId(hallDto.getName(), hallDto.getTheatreId()));

        if(foundHall.isPresent()){
            throw new Exception();
        }

        Hall hall = new Hall();
        Theatre theatre = theatreService.findById(hallDto.getTheatreId());

        hall.setName(hallDto.getName());
        hall.setSeats(hallDto.getSeats());
        hall.setTheatre(theatre);

        repository.save(hall);
    }


    public void deleteHall(int id){
        Hall toDelete = findById(id);
        repository.delete(toDelete);
    }
}
