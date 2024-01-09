package com.example.cinemaapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@SpringBootApplication
public class CinemaappApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinemaappApplication.class, args);
	}

}
