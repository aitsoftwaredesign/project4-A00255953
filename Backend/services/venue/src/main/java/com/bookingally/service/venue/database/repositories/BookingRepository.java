package com.bookingally.service.venue.database.repositories;

import com.bookingally.service.venue.database.models.Booking;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * The repository used to carry out CRUD operations on the Booking collection.
 * @author Nicholas Murray
 */
public interface BookingRepository extends MongoRepository<Booking, String> {
    Optional<Booking> findById(String id);

    Optional<List<Booking>> findAllByCustomerId(String customerId);

    Optional<List<Booking>> findAllByVenueId(String serviceId);

    Optional<List<Booking>> findAllByServiceId(String serviceId);

    void deleteAllByServiceId(String serviceId);

    void deleteAllByVenueId(String venueId);
}
