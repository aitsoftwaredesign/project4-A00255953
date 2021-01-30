package com.bookingally.service.venue.database.repositories;

import com.bookingally.service.venue.database.models.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * The repository used to carry out CRUD operations on the Service collection.
 * @author Nicholas Murray
 */
public interface ServiceRepository extends MongoRepository<Service, String> {
    Optional<Service> findById(String id);

    Optional<List<Service>> findAllByVenueId(String venueId);

    Optional<List<Service>> findByNameLike (String name);

    Optional<Service> findByVenueIdAndName(String venueId, String name);

    void deleteAllByVenueId(String venueId);
}
