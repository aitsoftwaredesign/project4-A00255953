package com.bookingally.service.rest.resources;

import com.bookingally.service.models.Venue;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VenueResource {

    @GetMapping("/venue")
    public ResponseEntity<String> get() {
        return new ResponseEntity<String>("Hello", HttpStatus.OK);
    }

    @PostMapping("/venue")
    public ResponseEntity<Venue> createVenue(@RequestBody Venue newVenue) {
        //Database logic goes here to persist new venue
        return new ResponseEntity<Venue>(newVenue,HttpStatus.CREATED);
    }

}
