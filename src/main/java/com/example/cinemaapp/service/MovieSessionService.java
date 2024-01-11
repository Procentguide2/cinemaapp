package com.example.cinemaapp.service;

import com.example.cinemaapp.dto.BookSeatForm;
import com.example.cinemaapp.dto.MovieSessionDto;
import com.example.cinemaapp.dto.MovieSessionDtoCreation;
import com.example.cinemaapp.dto.MovieSessionDtoId;
import com.example.cinemaapp.model.Hall;
import com.example.cinemaapp.model.MovieSession;
import com.example.cinemaapp.repository.MovieSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieSessionService {
    @Autowired
    private MovieSessionRepository repository;
    @Autowired
    private MovieService movieService;
    @Autowired
    private HallService hallService;

    public MovieSession findById(int id){
        return repository.findById(id).get();
    }

    public MovieSessionDto getDtoById(int id){
        MovieSession movieSession = findById(id);
        return new MovieSessionDto(movieSession.getStartDate(),
                movieSession.getCost(),
                movieSession.getAvailableSeats(),
                movieSession.getHall().getSeats(),
                movieSession.getMovie().getId(),
                movieSession.getHall().getId());

    }

    public List<MovieSessionDtoId> findAll(){
        List<MovieSession> sessions = repository.findAll();
        return toDtoList(sessions);
    }

    public List<MovieSessionDtoId> findAllByMovieId(Integer id){
        List<MovieSession> sessions = repository.findAllByMovieId(id);
        return toDtoList(sessions);
    }

    public List<MovieSessionDtoId> findAllByHallId(Integer id){
        List<MovieSession> sessions = repository.findAllByHallId(id);
        return toDtoList(sessions);
    }

    public void saveSession(MovieSessionDtoCreation session){
        MovieSession movieSession = new MovieSession();
        Hall hall = hallService.findById(session.getHallId());

        movieSession.setMovie(movieService.findById(session.getMovieId()));
        movieSession.setHall(hall);
        movieSession.setAvailableSeats(generateSeats(hall));
        movieSession.setCost(session.getCost());
        movieSession.setStartDate(session.getStartDate());

        repository.save(movieSession);
    }
    public void deleteSession(int id){
        MovieSession toDelete = findById(id);
        repository.delete(toDelete);
    }

    public void bookSeat(BookSeatForm form){
        MovieSession movieSession = findById(form.getSessionId());
        movieSession.setAvailableSeats(removeNumber(movieSession.getAvailableSeats(),form.getToBook()));
        repository.save(movieSession);
    }
    public String removeNumber(String input, int toRemove) {
        String[] numbers = input.split(",\\s*");
        StringBuilder updatedList = new StringBuilder();

        for (String number : numbers) {
            if (isInteger(number.trim()) && Integer.parseInt(number.trim()) != toRemove) {
                updatedList.append(number).append(", ");
            }
        }
        if (updatedList.length() > 0) {
            updatedList.setLength(updatedList.length() - 2);
        }

        return updatedList.toString();
    }
    private boolean isInteger(String s) {
        try {
            Integer.parseInt(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private String generateSeats(Hall hall){
        StringBuilder sb = new StringBuilder();
        int seatsNum = hall.getSeats();

        for (int i = 1; i <= seatsNum; i++) {
            sb.append(i);

            if (i < seatsNum) {
                sb.append(", ");
            }
        }

        return sb.toString();
    }


    private List<MovieSessionDtoId> toDtoList(List<MovieSession> sessions){
        List<MovieSessionDtoId> dtos = new ArrayList<>();

        for(MovieSession session : sessions){
            MovieSessionDtoId dto = new MovieSessionDtoId(session.getStartDate(),
                    session.getCost(),
                    session.getAvailableSeats(),
                    session.getHall().getSeats(),
                    session.getMovie().getId(),
                    session.getHall().getId(),session.getId());
            dtos.add(dto);
        }

        return dtos;
    }
}
