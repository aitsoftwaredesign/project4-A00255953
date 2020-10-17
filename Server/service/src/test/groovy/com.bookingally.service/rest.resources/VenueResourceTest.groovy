import com.bookingally.service.main.BookingAllyApplication
import com.bookingally.service.models.Venue
import com.bookingally.service.rest.resources.VenueResource
import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

@SpringBootTest(classes = BookingAllyApplication.class)
class VenueResourceTest extends Specification {

    def venueResource = new VenueResource()

    def "Venue should be persisted and return status 201 Created with the new venue"() {
        when: "create venue is called"
            def venue = new Venue("Murrays Hotel", "A lovely midlands hotel", "hotel")
            def response = venueResource.createVenue(venue)
        then: "response should contain status 201 Created"
            response.statusCodeValue == 201
            response.body.name == "Murrays Hotel"
            response.body.description == "A lovely midlands hotel"
            response.body.venueType == "hotel"
    }
}
