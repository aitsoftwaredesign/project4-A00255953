package com.bookingally.service.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan(basePackages = "com.bookingally.service")
@EntityScan(basePackages={"com.bookingally.service.database.models"})
@EnableMongoRepositories(basePackages={"com.bookingally.service"})
public class BookingAllyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookingAllyApplication.class);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				// Can just allow `methods` that you need.
				registry.addMapping("/*").allowedMethods("PUT", "GET", "DELETE", "OPTIONS", "PATCH", "POST");
			}
		};
	}

}
