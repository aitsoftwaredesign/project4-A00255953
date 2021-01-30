package com.bookingally.service.venue.rest.resources

import com.bookingally.service.venue.database.models.Service
import com.bookingally.service.venue.database.models.Venue
import com.bookingally.service.venue.database.repositories.BookingRepository
import com.bookingally.service.venue.database.repositories.ServiceRepository
import com.bookingally.service.venue.database.repositories.VenueRepository
import spock.lang.Shared
import spock.lang.Specification

class ServiceResourceTest extends Specification {

    @Shared
    def service = new Service("1", "Haircut", "A fine haircut", 10.00, "00_30")
    @Shared
    def serviceBadVenue = new Service("2", "Haircut", "A fine haircut", 10.00, "00_30")
    @Shared
    def serviceBadName = new Service("1", "Big Haircut", "A fine haircut", 10.00, "00_30")
    @Shared
    def venue = new Venue("1","1", "Murrays Barbers", "A lovely barber", "BARBER", "Main Road",
            null, "Mullingar")

    VenueRepository venueRepository = Mock()
    BookingRepository bookingRepository = Mock()
    ServiceRepository serviceRepository = Mock()

    def serviceResource = new ServiceResource()

    def setup() {
        serviceResource.serviceRepository = serviceRepository
        serviceResource.bookingRepository = bookingRepository
        serviceResource.venueRepository = venueRepository
    }

    def "When get service is called with a valid or invalid id the correct response is received" () {
        given:"A mock service repository that will return the Service"
            serviceRepository.findById("1") >> new Optional<Service>(service)
            serviceRepository.findById("2") >> new Optional<>()
        when: "get service is called"
            def response = serviceResource.getService(id)
        then: "the correct response should be given for a valid or invalid id"
            response.statusCodeValue == statusCode
            response.body == result
        where:
            id | statusCode | result
            "1"| 200        | service
            "2"| 404        | null
    }

    def "When get venue services is called with a valid or invalid id the correct response is received" () {
        given:"A mock service repository that will return the venues services"
            serviceRepository.findAllByVenueId("1") >> new Optional<List<Service>>([service])
            serviceRepository.findAllByVenueId("2") >> new Optional<>()
        when: "get service is called"
            def response = serviceResource.getVenueServices(id)
        then: "the correct response should be given for a valid or invalid id"
            response.statusCodeValue == statusCode
            response.body == result
        where:
            id | statusCode | result
            "1"| 200        | [service]
            "2"| 404        | null
    }

    def "When save service is called with a valid and invalid service the correct response is given"() {
        given: "A mock service repository, user details service and venue repository"
            serviceRepository.save(newService) >> newService
            venueRepository.existsById("1") >> true
            venueRepository.existsById("2") >> false
            serviceRepository.findByVenueIdAndName(serviceBadName.getVenueId(), serviceBadName.getName()) >> new Optional<Service>(serviceBadName)
            serviceRepository.findByVenueIdAndName(serviceBadVenue.getVenueId(), serviceBadVenue.getName()) >> new Optional<>()
            serviceRepository.findByVenueIdAndName(service.getVenueId(), service.getName()) >> new Optional<>()
        when: "Save service is called with a valid or invalid service"
            def response = serviceResource.saveService(newService)
        then: "the correct response is given"
            response.statusCodeValue == statusCode
            response.body == result
        where:
            newService          | statusCode | result
            service             | 201        | service
            serviceBadVenue     | 400        | "Invalid Service: The specified Venue does not exist"
            serviceBadName      | 400        | "Invalid Service: A Service already exists by that name for the specified Venue"
    }

    def "When delete service is called the service should be deleted from the database and return status 200 OK"() {
        given: "A mock Service repository that mimics the deleting"
            serviceRepository.delete(service)
        when: "delete service is called"
            def response = serviceResource.deleteService(service)
        then: "response should contain status 200 CREATED"
            1 * serviceRepository.delete(_)
            1 * bookingRepository.deleteAllByServiceId(_)
            response.statusCodeValue == 200
    }
}
