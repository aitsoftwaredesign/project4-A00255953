package com.bookingally.service.venue.rest.resources

import com.bookingally.service.common.database.repositories.PartnerRepository
import com.bookingally.service.venue.database.models.Venue
import com.bookingally.service.venue.database.repositories.BookingRepository
import com.bookingally.service.venue.database.repositories.ServiceRepository
import com.bookingally.service.venue.database.repositories.VenueRepository
import com.bookingally.service.venue.main.VenueApplication
import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

@SpringBootTest(classes = VenueApplication.class)
class VenueResourceTest extends Specification {

    def venue = new Venue("1","10", "Murrays Hotel", "A lovely midlands hotel", "HOTEL", "Main Road", null, "Mullingar")
    List<Venue> venues = [
            venue,
            new Venue("1", "10", "Murrays Pub", "A lovely little pub", "PUB", "Main Road", null, "Mullingar")
    ]

    BookingRepository bookingRepository = Mock()
    VenueRepository venueRepository = Mock()
    ServiceRepository serviceRepository = Mock()
    PartnerRepository userRepository = Mock()

    def venueResource = new VenueResource()

    def setup() {
        venueResource.venueRepository = venueRepository
        venueResource.serviceRepository = serviceRepository
        venueResource.bookingRepository = bookingRepository
        venueResource.partnerRepository = userRepository
    }

    def "When get venue is called with a valid id the venue should be returned"() {
        given: "A mock Venue repository that will return the venue"
            venueRepository.findById("1") >> new Optional<Venue>(venue)
            venueRepository.findById("9") >> new Optional<>()
        when: "get all venues is called"
            def response = venueResource.getVenue(id)
        then: "response should contain all the venues and status 200 OK"
            response.statusCodeValue == statusCode

        where:
             id | statusCode
             "1"| 200
             "9"| 404
    }

    def "When get all venues is called a list of all venues should be returned"() {
        given: "A mock Venue repository that will return all venue objects"
            venueRepository.findAll() >> venues
        when: "get all venues is called"
            def response = venueResource.getAllVenues()
        then: "response should contain all the venues and status 200 OK"
            response.statusCodeValue == 200
            response.body[0].name == "Murrays Hotel"
            response.body[1].name == "Murrays Pub"
    }

    def "Venue should be persisted and return status 201 CREATED with the new venue"() {
        given: "A mock Venue repository that mimics the saving of venues"
            venue.setPartnerId(partner_id)
            userRepository.existsById("1") >> true
            userRepository.existsById("9") >> false
            venueRepository.save(venue) >> venue
        when: "create venue is called"
            def response = venueResource.saveVenue([venue])
        then: "response should contain status 201 CREATED"
            response.statusCodeValue == statusCode

        where:
            partner_id | statusCode
                    "1"| 201
                    "9"| 400
    }

    def "Venue should be deleted from the database and return status 200 OK"() {
        given: "A mock Venue repository that mimics the deleting"
            venueRepository.delete(venue)
        when: "delete venue is called"
            def response = venueResource.deleteVenue(venue)
        then: "response should contain status 200 CREATED"
            1 * serviceRepository.deleteAllByVenueId(_)
            1 * bookingRepository.deleteAllByVenueId(_)
            1 * venueRepository.delete(_)
            response.statusCodeValue == 200
    }

    def "When get all partner venues is called with a valid id the venues should be returned"() {
        given: "A mock Venue repository that will return the venue"
        venueRepository.findByPartnerId("10") >> new Optional<List<Venue>>(venues)
        venueRepository.findByPartnerId("11") >> new Optional<>()
        when: "get all venues is called"
        def response = venueResource.getPartnerVenues(id)
        then: "response should contain all the venues and status 200 OK"
        response.statusCodeValue == statusCode

        where:
        id  | statusCode
        "10"| 200
        "11"| 404
    }
}
