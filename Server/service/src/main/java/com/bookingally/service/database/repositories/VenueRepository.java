package com.bookingally.service.database.repositories;

import com.bookingally.service.database.models.Venue;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VenueRepository extends MongoRepository<Venue, Integer> {
    Optional<Venue> findById(String id);
}
