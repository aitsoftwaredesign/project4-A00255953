package com.bookingally.service.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.bookingally.service")
@EntityScan(basePackages={"com.bookingally.service.database.models"})
@EnableMongoRepositories(basePackages={"com.bookingally.service"})
public class BookingAllyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookingAllyApplication.class);
	}

}
