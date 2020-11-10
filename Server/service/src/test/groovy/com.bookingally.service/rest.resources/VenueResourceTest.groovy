import com.bookingally.service.database.repositories.PartnerRepository
import com.bookingally.service.database.repositories.VenueRepository
import com.bookingally.service.main.BookingAllyApplication
import com.bookingally.service.database.models.Venue
import com.bookingally.service.rest.resources.VenueResource
import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

@SpringBootTest(classes = BookingAllyApplication.class)
class VenueResourceTest extends Specification {

    def venue = new Venue("1", "Murrays Hotel", "A lovely midlands hotel", "HOTEL", "Main Road", null, "Mullingar")
    List<Venue> venues = [
            venue,
            new Venue("1", "Murrays Pub", "A lovely little pub", "PUB", "Main Road", null, "Mullingar")
    ]

    VenueRepository venueRepository = Mock()
    PartnerRepository partnerRepository = Mock()

    def venueResource = new VenueResource()

    def setup() {
        venueResource.venueRepository = venueRepository
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
            venue.setPartner_id(partner_id)
            venueResource.partnerRepository = partnerRepository
            partnerRepository.existsById("1") >> true
            partnerRepository.existsById("9") >> false
            venueRepository.save(venue) >> venue
        when: "create venue is called"
            def response = venueResource.saveVenue(venue)
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
        response.statusCodeValue == 200
    }
}
