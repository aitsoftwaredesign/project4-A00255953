package com.bookingally.service.venue.database.repositories;

import com.bookingally.service.venue.database.models.Venue;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VenueRepository extends MongoRepository<Venue, Integer> {
    Optional<Venue> findById(String id);

    Optional<List<Venue>> findByPartnerId(String id);

    Optional<Venue> findByName(String name);

    Optional<List<Venue>> findByVenueType(String type);
}
