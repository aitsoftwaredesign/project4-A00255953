package groovy.com.bookingally.service.images.rest.resources

import com.amazonaws.services.s3.AmazonS3
import com.bookingally.service.common.database.models.Customer
import com.bookingally.service.common.database.models.Partner
import com.bookingally.service.common.rest.security.JwtTokenUtil
import com.bookingally.service.common.rest.security.UserDetailsService
import com.bookingally.service.images.rest.models.ImageDeleteRequest
import com.bookingally.service.images.rest.resources.ImageResource
import com.bookingally.service.images.util.BucketClient
import org.springframework.mock.web.MockMultipartFile
import spock.lang.Shared
import spock.lang.Specification

class ImageResourceTest extends Specification {

    @Shared
    MockMultipartFile image = new MockMultipartFile("image.jpg",  "image.jpg", "image/jpeg" )

    @Shared
    ImageDeleteRequest deleteRequest = new ImageDeleteRequest("image.jpeg")

    @Shared
    def partner = new Partner("john", "smith", "john", "", "", "Barber")

    @Shared
    def customer = new Customer("jane", "doe", "jane", "", "")

    @Shared
    def partnerUrl = "https://booking-ally-images.s3.amazonaws.com/venues/1234/image.jpg"

    BucketClient bucketClient = new BucketClient()

    AmazonS3 s3Client = Mock()

    JwtTokenUtil jwtTokenUtil = Mock()

    UserDetailsService userDetailsService = Mock()

    ImageResource imageResource = new ImageResource()

    def setupSpec() {
        partner.id = "1234"
        customer.id = "5678"
    }

    def setup() {
        bucketClient.s3Client = s3Client
        imageResource.bucketClient = bucketClient
        imageResource.jwtTokenUtil = jwtTokenUtil
        imageResource.userDetailsService = userDetailsService
    }

    def "When upload image is called with valid and invalid parameters the correct response should be given" () {
        given: "An image resource with mocks to mimic functionality"
            jwtTokenUtil.getUsernameFromToken(partner.username) >> partner.username
            jwtTokenUtil.getUsernameFromToken(customer.username) >> customer.username
            userDetailsService.loadUserAccount(partner.username) >> ["string", partner]
            userDetailsService.loadUserAccount(customer.username) >> ["string", customer]
        when: "Upload image is called"
            def result = imageResource.uploadImage(image, token as String)
        then: "The correct response should be given"
            result.statusCodeValue == response
            try {
                result.body.imageUrl == repsonseBody
            } catch(Exception e) {
                result.body.toString().startsWith(repsonseBody)
            }
        where:
            user    | token                        | response | repsonseBody
            partner | "token " + partner.username  |   201    | partnerUrl
            customer| "token " + customer.username |   400    | "Failed to upload image: "
    }

    def "When delete image is called with valid or invalid parameters the correct response should be given" () {
        given: "An image resource with mocks to mimic functionality"
            jwtTokenUtil.getUsernameFromToken(partner.username) >> partner.username
            jwtTokenUtil.getUsernameFromToken(customer.username) >> customer.username
            userDetailsService.loadUserAccount(partner.username) >> ["string", partner]
            userDetailsService.loadUserAccount(customer.username) >> ["string", customer]
        when: "Delete image is called"
            def result = imageResource.deleteImage(deleteRequest, token as String)
        then: "The correct response should be given"
            result.statusCodeValue == response
            result.body.toString().startsWith(repsonseBody)
        where:
            token                        | response | repsonseBody
            "token " + partner.username  |   200    | ""
            "token " + customer.username |   400    | "Failed to delete image: "
    }
}
