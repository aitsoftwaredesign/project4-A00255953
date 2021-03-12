package com.bookingally.service.venue.rest.resources

import com.bookingally.service.common.database.models.Customer
import com.bookingally.service.common.rest.security.UserDetailsService
import com.bookingally.service.venue.database.models.Booking
import com.bookingally.service.venue.database.models.Service
import com.bookingally.service.venue.database.models.Venue
import com.bookingally.service.venue.database.repositories.BookingRepository
import com.bookingally.service.venue.database.repositories.ServiceRepository
import com.bookingally.service.venue.database.repositories.VenueRepository
import com.bookingally.service.venue.main.VenueApplication
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.core.userdetails.User
import spock.lang.Shared
import spock.lang.Specification;

@SpringBootTest(classes = VenueApplication.class)
class BookingResourceTest extends Specification {

    @Shared
    def booking  = new Booking("1", "1", "1", "1", new Date(2021, 2, 1,13,30),
            new Date(2021, 2, 1,14,00))
    @Shared
    def bookingBadVenue  = new Booking("1", "2", "1", "1", new Date(2021, 2, 1,13,30),
            new Date(2021, 2, 1,14,00))
    @Shared
    def bookingBadService  = new Booking("1", "1", "2", "1", new Date(2021, 2, 1,13,30),
            new Date(2021, 2, 1,14,00))
    @Shared
    def bookingBadCustomer  = new Booking("1", "1", "1", "2", new Date(2021, 2, 1,13,30),
            new Date(2021, 2, 1,14,00))

    def venue = new Venue("1","10", "Murrays Hotel", "A lovely midlands hotel", "HOTEL", "Main Road",
            null, "Mullingar")
    def service = new Service("1", "Haircut", "A fine haircut", 10.00, "00_30")
    def customer = new Customer("John", "Smith", "john", "password", "john.smith@email.com")

    BookingRepository bookingRepository = Mock()
    VenueRepository venueRepository = Mock()
    ServiceRepository serviceRepository = Mock()
    UserDetailsService userDetailsService = Mock()

    def bookingResource = new BookingResource()

    def setup() {
        bookingResource.bookingRepository = bookingRepository
        bookingResource.venueRepository = venueRepository
        bookingResource.serviceRepository = serviceRepository
        bookingResource.userDetailsService = userDetailsService
    }

    def "When get booking is called with a valid or invalid id the correct response is received" () {
        given:"A mock booking repository that will return the booking"
            bookingRepository.findById("1") >> new Optional<Booking>(booking)
            bookingRepository.findById("2") >> new Optional<>()
            userDetailsService.loadUserById("1") >> new User(customer.getUsername(), customer.getPassword(), new ArrayList<>())
            userDetailsService.loadUserAccount(customer.getUsername()) >> ["Customer", customer]
        when: "get booking is called"
            def response = bookingResource.getBooking(id, returnAccount)
        then: "the correct response should be given for a valid or invalid id"
            response.statusCodeValue == statusCode
        where:
            id | statusCode | returnAccount
            "1"| 200        | false
            "1"| 200        | true
            "2"| 404        | false
            "2"| 404        | true
    }

    def "When get venue bookings is called with a valid and invalid venue id the correct response is received"() {
        given:"A mock booking repository that will return the booking"
            def bookings = [booking]
            bookingRepository.findAllByVenueId("1") >> new Optional<List<Booking>>(bookings)
            bookingRepository.findAllByVenueId("2") >> new Optional<>()
        when: "get booking is called"
            def response = bookingResource.getVenueBookings(id)
        then: "the correct response should be given for a valid or invalid id"
            response.statusCodeValue == statusCode
        where:
            id | statusCode
            "1"| 200
            "2"| 404
    }

    def "When get user bookings is called with a valid and invalid venue id the correct response is received"() {
        given:"A mock booking repository that will return the booking"
            def bookings = [booking]
            bookingRepository.findAllByCustomerId("1") >> new Optional<List<Booking>>(bookings)
            bookingRepository.findAllByCustomerId("2") >> new Optional<>()
        when: "get booking is called"
            def response = bookingResource.getUserBookings(id)
        then: "the correct response should be given for a valid or invalid id"
            response.statusCodeValue == statusCode
        where:
            id | statusCode
            "1"| 200
            "2"| 404
    }

    def "When save booking is called with a valid and invalid booking the correct response is given"() {
        given: "A mock booking repository, user details service and venue repository"
            bookingRepository.save(newBooking) >> newBooking
            userDetailsService.loadUserById("1") >> new User(customer.getUsername(), customer.getPassword(), new ArrayList<>());
            userDetailsService.loadUserById("2") >> null
            serviceRepository.findById("1") >> new Optional<Service>(service)
            serviceRepository.findById("2") >> new Optional<>()
            venueRepository.findById("1") >> new Optional<Venue>(venue)
            venueRepository.findById("2") >> new Optional<>()
        when: "Save booking is called with a valid or invalid booking"
            def response = bookingResource.saveBooking(newBooking)
        then: "the correct response is given"
            response.statusCodeValue == statusCode
        where:
            newBooking          | statusCode
            booking             | 201
            bookingBadVenue     | 400
            bookingBadCustomer  | 400
            bookingBadService   | 400
    }

    def "When delete booking is called the booking should be deleted from the database and return status 200 OK"() {
        given: "A mock Booking repository that mimics the deleting"
            bookingRepository.delete(booking)
        when: "delete booking is called"
            def response = bookingResource.deleteBooking(booking)
        then: "response should contain status 200 CREATED"
            1 * bookingRepository.delete(_)
            response.statusCodeValue == 200
    }

}
