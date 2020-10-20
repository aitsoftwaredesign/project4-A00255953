package com.bookingally.service.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.bookingally.service")
@EntityScan(basePackages={"com.bookingally.service.database.models"})
@EnableJpaRepositories(basePackages={"com.bookingally.service"})
public class BookingAllyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookingAllyApplication.class);
	}

}
