package com.bookingally.service.venue.rest.resources;

import com.bookingally.service.common.database.models.Account;
import com.bookingally.service.common.database.models.Customer;
import com.bookingally.service.common.rest.security.UserDetailsService;
import com.bookingally.service.venue.database.models.Booking;
import com.bookingally.service.venue.database.models.Service;
import com.bookingally.service.venue.database.models.Venue;
import com.bookingally.service.venue.database.repositories.BookingRepository;
import com.bookingally.service.venue.database.repositories.ServiceRepository;
import com.bookingally.service.venue.database.repositories.VenueRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The REST controller that will allow a client to carry out CRUD operations on the Booking
 * collection in the database.
 * @author Nicholas Murray
 */
@RestController
@RequestMapping("/booking")
public class BookingResource {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Returns a {@link ResponseEntity} with the requested {@link Booking} entity from the
     * database within its response body.
     * @param id - the id of the booking to retrieve.
     * @return {@link ResponseEntity<Booking>} response containing the Booking in the body.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@PathVariable String id, @RequestParam(defaultValue = "false") boolean returnUser ) {
        Optional<Booking> booking = bookingRepository.findById(id);

        if(returnUser) {
            if(booking.isPresent()) {
                Booking actualBooking = booking.get();
                try {
                    UserDetails user = userDetailsService.loadUserById(actualBooking.getCustomerId());
                    Account userAccount = (Account) userDetailsService.loadUserAccount(user.getUsername()).get(1);
                    String userName = userAccount.getFirstname() + " " + userAccount.getLastname();
                    List<Object> responseEntity = Arrays.asList(userName, actualBooking);
                    return new ResponseEntity<>(responseEntity, HttpStatus.OK);
                } catch (UsernameNotFoundException e) {
                    return new ResponseEntity<>(actualBooking, HttpStatus.OK);
                }
            }
        }
        return booking.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Returns a {@link ResponseEntity} with the requested {@link Booking} entity from the
     * database within its response body.
     * @param id - the venue to retrieve the bookings for.
     * @return {@link ResponseEntity<Booking>} response containing the Booking in the body.
     */
    @GetMapping("/venue/{id}")
    public ResponseEntity<List<Booking>> getVenueBookings(@PathVariable String id ) {
        Optional<List<Booking>> booking = bookingRepository.findAllByVenueId(id);
        return booking.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Returns a {@link ResponseEntity} with the requested {@link Booking} entity from the
     * database within its response body.
     * @param id - the user to retrieve the bookings for.
     * @return {@link ResponseEntity<Booking>} response containing the Booking in the body.
     */
    @GetMapping("/user/{id}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String id ) {
        Optional<List<Booking>> booking = bookingRepository.findAllByCustomerId(id);
        return booking.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Persists a given {@link Booking} in the database, then returns the persisted object. This can
     * be used to create a new booking or update and existing. To create a new booking the id value
     * of booking must be null, likewise to update an existing booking the id should be that of the booking to
     * be updated.
     * @param newBooking the new {@link Booking} to be persisted in the database
     * @return {@link ResponseEntity<Booking>} a response entity containing the saved venue in its response body
     */
    @PostMapping()
    public ResponseEntity<?> saveBooking(@RequestBody Booking newBooking) {
        if(validateBooking(newBooking)) {
            final Booking booking = bookingRepository.save(newBooking);
            return new ResponseEntity<>( booking,HttpStatus.CREATED);
        } else {
            final String message = "Invalid Booking.";
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Deletes the given {@link Booking} from the Database.
     * @param booking - the booking to be deleted.
     * @return {@link ResponseEntity} response with {@link HttpStatus} 200 OK if delete is successful.
     */
    @DeleteMapping()
    public ResponseEntity<?> deleteBooking(@RequestBody Booking booking) {
        bookingRepository.delete(booking);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Checks to see if a given booking has valid IDs for existing {@link Venue}{@link Service} and
     * {@link Customer}
     * @param newBooking
     * @return true if all IDs are valid and false if not.
     */
    private boolean validateBooking(Booking newBooking) {
        if(userDetailsService.loadUserById(newBooking.getCustomerId()) != null
                && venueRepository.findById(newBooking.getVenueId()).isPresent()
                && serviceRepository.findById(newBooking.getServiceId()).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

}
