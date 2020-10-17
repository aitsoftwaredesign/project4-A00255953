package com.bookingally.service.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.bookingally.service.rest.resources")
public class BookingAllyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookingAllyApplication.class);
	}

}
