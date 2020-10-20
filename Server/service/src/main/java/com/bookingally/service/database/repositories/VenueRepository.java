package com.bookingally.service.database.repositories;

import com.bookingally.service.database.models.Venue;
import org.springframework.data.repository.CrudRepository;

public interface VenueRepository extends CrudRepository<Venue, Integer> {
}
