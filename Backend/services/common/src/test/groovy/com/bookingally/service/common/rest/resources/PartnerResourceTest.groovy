package com.bookingally.service.common.rest.resources

import com.bookingally.service.common.CommonTestConfig
import com.bookingally.service.common.database.models.Partner
import com.bookingally.service.common.database.repositories.PartnerRepository
import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

@SpringBootTest(classes = CommonTestConfig.class)
class PartnerResourceTest extends Specification {

    def user = new Partner("Nick", "Murray","Murray", "password","email1", "barber")

    PartnerRepository partnerRepository = Mock()

    def partnerResource = new PartnerResource()

    def setup() {
        partnerResource.partnerRepository = partnerRepository
    }

    def "When get partner is called with a valid id the partner should be returned"() {
        given: "A mock partner repository that will return the partner"
            partnerRepository.findByUsername("Murray") >> new Optional<Partner>(user)
            partnerRepository.findByUsername("Jim") >> new Optional<>()
        when: "get all partners is called"
            def response = partnerResource.getAccount(userName)
        then: "response should contain all the partners and status 200 OK"
            response.statusCodeValue == statusCode
            if (statusCode == 200) response.body.username == userName
            else response.body == null
        where:
             userName   | statusCode
             "Murray"   | 200
             "Jim"      | 404
    }

    def "Partner should be deleted from the database and return status 200 OK"() {
        given: "A mock partner repository that mimics the deleting"
        partnerRepository.delete(user)
        when: "delete partner is called"
        def response = partnerResource.deleteAccount(user)
        then: "response should contain status 200 CREATED"
        response.statusCodeValue == 200
    }
}
