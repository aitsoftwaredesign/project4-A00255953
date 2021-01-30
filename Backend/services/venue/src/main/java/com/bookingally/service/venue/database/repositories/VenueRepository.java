package com.bookingally.service.venue.database.repositories;

import com.bookingally.service.venue.database.models.Venue;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * The repository used to carry out CRUD operations on the Venue collection.
 * @author Nicholas Murray
 */
public interface VenueRepository extends MongoRepository<Venue, String> {
    Optional<Venue> findById(String id);

    Optional<List<Venue>> findByPartnerId(String id);

    Optional<List<Venue>> findAllByNameLikeIgnoreCase(String name);

    Optional<List<Venue>> findAllByVenueTypeLikeIgnoreCase(String type);

    Optional<List<Venue>> findAllByTownLikeIgnoreCase(String type);

    Optional<List<Venue>> findAllByNameLikeIgnoreCaseAndVenueTypeLikeIgnoreCase(String name, String venueType);

    Optional<List<Venue>> findAllByNameLikeIgnoreCaseAndTownLikeIgnoreCase(String name, String town);

    Optional<List<Venue>> findAllByVenueTypeLikeIgnoreCaseAndTownLikeIgnoreCase(String venueType, String town);

    Optional<List<Venue>> findAllByNameLikeIgnoreCaseAndVenueTypeLikeIgnoreCaseAndTownLikeIgnoreCase(String name, String venueType, String town);

    default Optional<List<Venue>> searchForVenue(String name, String venueType, String town) {
        if(!name.equals("") && venueType.equals("") && town.equals("")) {
            return findAllByNameLikeIgnoreCase(name);
        } else if(name.equals("") && !venueType.equals("") && town.equals("")) {
           return findAllByVenueTypeLikeIgnoreCase(venueType);
        } else if(name.equals("") && venueType.equals("") && !town.equals("")) {
           return findAllByTownLikeIgnoreCase(town);
        } else if(!name.equals("") && !venueType.equals("") && town.equals("")) {
            return findAllByNameLikeIgnoreCaseAndVenueTypeLikeIgnoreCase(name, venueType);
        } else if(name.equals("") && !venueType.equals("") && !town.equals("")) {
            return findAllByVenueTypeLikeIgnoreCaseAndTownLikeIgnoreCase(venueType, town);
        } else if(!name.equals("") && venueType.equals("") && !town.equals("")) {
            return findAllByNameLikeIgnoreCaseAndTownLikeIgnoreCase(name, town);
        } else {
            return findAllByNameLikeIgnoreCaseAndVenueTypeLikeIgnoreCaseAndTownLikeIgnoreCase(name, venueType, town);
        }
    }

    void deleteAllByPartnerId(String partnerId);
}
