package com.bookingally.service.venue.rest.resources;

import com.bookingally.service.venue.database.models.Booking;
import com.bookingally.service.venue.database.models.Service;
import com.bookingally.service.venue.database.repositories.BookingRepository;
import com.bookingally.service.venue.database.repositories.ServiceRepository;
import com.bookingally.service.venue.database.repositories.VenueRepository;
import java.util.List;
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

/**
 * The REST controller that will allow a client to carry out CRUD operations on the Service
 * collection in the database.
 * @author Nicholas Murray
 */
@RestController
@RequestMapping("/service")
public class ServiceResource {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VenueRepository venueRepository;

    /**
     * Returns a {@link ResponseEntity} with the requested {@link Service} entity from the
     * database within its response body.
     * @param id - the service id to retrieve.
     * @return {@link ResponseEntity<Service>} response containing the Service in the body.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Service> getService(@PathVariable String id) {
        Optional<Service> service = serviceRepository.findById(id);
        return service.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Returns a {@link ResponseEntity} with the list of services for the requested venue.
     * @param id - venue id to get the services for
     * @return {@link ResponseEntity<List<Service>>} response containing the list of services in the body.
     */
    @GetMapping("/venue/{id}")
    public ResponseEntity<List<Service>> getVenueServices(@PathVariable String id ) {
        Optional<List<Service>> services = serviceRepository.findAllByVenueId(id);
        return services.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Persists a given {@link Service} to the collection in the database. Can be used to create or update a service.
     * A new service will be created where the supplied service has an ID of null, and an existing service will be updated
     * when the ID is not null.
     * @param newService - the service to be persisted.
     * @return - The newly saved service or error message.
     */
    @PostMapping()
    public ResponseEntity<?> saveService(@RequestBody Service newService) {
        String valid = validateService(newService);
        if(valid.equals("valid")) {
            final Service service = serviceRepository.save(newService);
            return new ResponseEntity<>(service,HttpStatus.CREATED);
        } else {
            final String message = "Invalid Service: " + valid;
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Deletes the given {@link Service} from the Database and all associated {@link Booking}
     * @param service - the service to be deleted.
     * @return {@link ResponseEntity} response with {@link HttpStatus} 200 OK if delete is successful.
     */
    @DeleteMapping()
    public ResponseEntity<?> deleteService(@RequestBody Service service) {
        bookingRepository.deleteAllByServiceId(service.getId());
        serviceRepository.delete(service);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    private String validateService(Service newService) {
        if(venueRepository.existsById(newService.getVenueId())) {
            if(serviceRepository.findByVenueIdAndName(newService.getVenueId(), newService.getName()).isPresent()) {
                return "A Service already exists by that name for the specified Venue";
            } else {
                return "valid";
            }
        } else {
            return "The specified Venue does not exist";
        }
    }

}
