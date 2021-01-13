package com.bookingally.service.common.rest.resources

import com.bookingally.service.common.CommonTestConfig
import com.bookingally.service.common.database.models.Customer
import com.bookingally.service.common.database.repositories.CustomerRepository
import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

@SpringBootTest(classes = CommonTestConfig.class)
class CustomerResourceTest extends Specification {

    def user = new Customer("Nick","Murray","Murray", "password","email1")

    CustomerRepository customerRepository = Mock()

    def customerResource = new CustomerResource()

    def setup() {
        customerResource.customerRepository = customerRepository
    }

    def "When get customer is called with a valid id the customer should be returned"() {
        given: "A mock customer repository that will return the customer"
            customerRepository.findByUsername("Murray") >> new Optional<Customer>(user)
            customerRepository.findByUsername("Jim") >> new Optional<>()
        when: "get all partners is called"
            def response = customerResource.getAccount(userName)
        then: "response should contain all the partners and status 200 OK"
            response.statusCodeValue == statusCode
            if (statusCode == 200) response.body.username == userName
            else response.body == null
        where:
             userName   | statusCode
             "Murray"   | 200
             "Jim"      | 404
    }

    def "Customer should be deleted from the database and return status 200 OK"() {
        given: "A mock customer repository that mimics the deleting"
        customerRepository.delete(user)
        when: "delete customer is called"
        def response = customerResource.deleteAccount(user)
        then: "response should contain status 200 CREATED"
        response.statusCodeValue == 200
    }
}
