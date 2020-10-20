package com.bookingally.service.rest.resources

import com.bookingally.service.database.models.Partner
import com.bookingally.service.database.repositories.PartnerRepository
import com.bookingally.service.main.BookingAllyApplication
import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

@SpringBootTest(classes = BookingAllyApplication.class)
class PartnerResourceTest extends Specification {

    def partner = new Partner("Murrays Hotels")
    List<Partner> partners = [
            partner,
            new Partner("Murrays Pubs")
    ]

    PartnerRepository partnerRepository = Mock()

    def partnerResource = new PartnerResource()

    def setup() {
        partnerResource.partnerRepository = partnerRepository
    }

    def "When get partner is called with a valid id the partner should be returned"() {
        given: "A mock partner repository that will return the partner"
            partnerRepository.findById(1) >> new Optional<Partner>(partner)
            partnerRepository.findById(9) >> new Optional<>()
        when: "get all partners is called"
            def response = partnerResource.getPartner(id)
        then: "response should contain all the partners and status 200 OK"
            response.statusCodeValue == statusCode

        where:
             id | statusCode
             1  | 200
             9  | 404
    }

    def "When get all partners is called a list of all partners should be returned"() {
        given: "A mock partner repository that will return all partner objects"
            partnerRepository.findAll() >> partners
        when: "get all partners is called"
            def response = partnerResource.getAllPartners()
        then: "response should contain all the partners and status 200 OK"
            response.statusCodeValue == 200
            response.body[0].name == "Murrays Hotels"
            response.body[1].name == "Murrays Pubs"
    }

    def "partner should be persisted and return status 201 CREATED with the new partner"() {
        given: "A mock partner repository that mimics the saving of partners"
            partnerRepository.save(partner) >> partner
        when: "create partner is called"
            def response = partnerResource.savePartner(partner)
        then: "response should contain status 201 CREATED"
            response.statusCodeValue == 201
            response.body.name == "Murrays Hotels"
    }

    def "partner should be deleted from the database and return status 200 OK"() {
        given: "A mock partner repository that mimics the deleting"
        partnerRepository.delete(partner)
        when: "delete partner is called"
        def response = partnerResource.deletePartner(partner)
        then: "response should contain status 200 CREATED"
        response.statusCodeValue == 200
    }
}
