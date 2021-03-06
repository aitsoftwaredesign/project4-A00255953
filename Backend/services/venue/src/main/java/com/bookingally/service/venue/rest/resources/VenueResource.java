package com.bookingally.service.venue.rest.resources;

import com.bookingally.service.common.database.repositories.PartnerRepository;
import com.bookingally.service.venue.database.models.Venue;
import com.bookingally.service.venue.database.repositories.BookingRepository;
import com.bookingally.service.venue.database.repositories.ServiceRepository;
import com.bookingally.service.venue.database.repositories.VenueRepository;
import com.bookingally.service.venue.rest.model.VenueSearchOptions;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * A REST Controller that can be used to carry our CRUD operations for {@link Venue} entities persisted in the database
 * @author Nicholas Murray
 */
@RestController
@RequestMapping("/venue")
public class VenueResource {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PartnerRepository partnerRepository;

    /**
     * Returns a {@link ResponseEntity} with the requested {@link Venue} entity from the
     * database within its response body.
     * @return {@link ResponseEntity<Venue>} response containing the Venue in the body.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenue(@PathVariable String id ) {
        Optional<Venue> venue = venueRepository.findById(id);
        return venue.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Accepts {@link VenueSearchOptions} to use as criteria for a database search for the {@link Venue}
     * that match the given values.
     * @param criteria - The search criteria
     * @return - The {@link Venue} (s) that match the given criteria
     */
    @PostMapping("/find")
    public ResponseEntity<List<Venue>> findVenues(@RequestBody VenueSearchOptions criteria) {
        Optional<List<Venue>> venues = venueRepository.searchForVenue(
                criteria.getName(),
                criteria.getType(),
                criteria.getLocation()
        );

        return venues.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Returns a {@link ResponseEntity} with list of all {@link Venue} entities persisted in the
     * database within its response body.
     * @return {@link ResponseEntity<List<Venue>>} response containing the Venues in the body.
     */
    @GetMapping()
    public ResponseEntity<List<Venue>> getAllVenues() {
        List<Venue> venues = venueRepository.findAll();
        return new ResponseEntity<>(venues, HttpStatus.OK);
    }

    /**
     * Returns a {@link ResponseEntity} with list of all {@link Venue} entities persisted in the
     * database for the given partner id within its response body.
     * @return {@link ResponseEntity<List<Venue>>} response containing the Partners Venues in the body.
     */
    @GetMapping("/partner/{partnerId}")
    public ResponseEntity<List<Venue>> getPartnerVenues(@PathVariable String partnerId) {
        Optional<List<Venue>> venues = venueRepository.findByPartnerId(partnerId);

        return venues.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Persists a given {@link Venue} in the database, then returns the persisted object. This can
     * be used to create a new venue or update and existing venue. To create a new venue the id value
     * of venue must be null, likewise to update an existing venue the id should be that of the venue to
     * be updated.
     * @param newVenue the new {@link Venue} to be persisted in the database
     * @return {@link ResponseEntity<Venue>} a response entity containing the saved venue in its response body
     */
    @PostMapping()
    public ResponseEntity<?> saveVenue(@RequestBody Venue newVenue) {
        if(partnerRepository.existsById(newVenue.getPartnerId())) {
            final Venue venue = venueRepository.save(newVenue);
            return new ResponseEntity<>( venue,HttpStatus.CREATED);
        } else {
            final String message = "Invalid Partner ID";
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Deletes the given {@link Venue} from the Database, and all associated {@link com.bookingally.service.venue.database.models.Booking}
     * and {@link com.bookingally.service.venue.database.models.Service}.
     * @return {@link ResponseEntity} response with {@link HttpStatus} 200 OK if delete is successful.
     */
    @DeleteMapping()
    public ResponseEntity<?> deleteVenue(@RequestBody Venue venue) {
        bookingRepository.deleteAllByVenueId(venue.getId());
        serviceRepository.deleteAllByVenueId(venue.getId());
        venueRepository.delete(venue);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
