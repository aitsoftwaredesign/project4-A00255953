package com.bookingally.service.rest.resources;

import com.bookingally.service.database.models.Venue;
import com.bookingally.service.database.repositories.VenueRepository;
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

    /**
     * Returns a {@link ResponseEntity} with the requested {@link Venue} entity from the
     * database within its response body.
     * @return {@link ResponseEntity<Venue>} response containing the Venue in the body.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenue(@PathVariable Integer id ) {
        Optional<Venue> venue = venueRepository.findById(id);
        return venue.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Returns a {@link ResponseEntity} with list of all {@link Venue} entities persisted in the
     * database within its response body.
     * @return {@link ResponseEntity<List<Venue>>} response containing the Venues in the body.
     */
    @GetMapping()
    public ResponseEntity<List<Venue>> getAllVenues() {
        List<Venue> venues = (List<Venue>) venueRepository.findAll();
        return new ResponseEntity<>(venues, HttpStatus.OK);
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
    public ResponseEntity<Venue> saveVenue(@RequestBody Venue newVenue) {
        final Venue venue = venueRepository.save(newVenue);
        return new ResponseEntity<>( venue,HttpStatus.CREATED);
    }

    /**
     * Deletes the given {@link Venue} from the Database.
     * @return {@link ResponseEntity} response with {@link HttpStatus} 200 OK if delete is successful.
     */
    @DeleteMapping()
    public ResponseEntity deleteVenue(@RequestBody Venue venue) {
        venueRepository.delete(venue);
        return new ResponseEntity(HttpStatus.OK);
    }

}
