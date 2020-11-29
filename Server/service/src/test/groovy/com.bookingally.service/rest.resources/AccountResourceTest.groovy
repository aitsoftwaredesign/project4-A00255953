package com.bookingally.service.rest.resources


import com.bookingally.service.database.models.Account
import com.bookingally.service.database.repositories.AccountRepository
import com.bookingally.service.main.BookingAllyApplication
import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

@SpringBootTest(classes = BookingAllyApplication.class)
class AccountResourceTest extends Specification {

    def user = new Account("Murrays Hotels", "password", "partner")
    List<Account> users = [
            user,
            new Account("Murrays Pubs", "password", "standard")
    ]

    AccountRepository userRepository = Mock()

    def userResource = new AccountResource()

    def setup() {
        userResource.accountRepository = userRepository
    }

    def "When get partner is called with a valid id the partner should be returned"() {
        given: "A mock partner repository that will return the partner"
            userRepository.findByUsername("Murrays Hotels") >> new Optional<Account>(user)
            userRepository.findByUsername("Jims Bars") >> new Optional<>()
        when: "get all partners is called"
            def response = userResource.getAccount(userName)
        then: "response should contain all the partners and status 200 OK"
            response.statusCodeValue == statusCode

        where:
             userName        | statusCode
             "Murrays Hotels"| 200
             "Jims Bars"     | 404
    }

    def "partner should be deleted from the database and return status 200 OK"() {
        given: "A mock partner repository that mimics the deleting"
        userRepository.delete(user)
        when: "delete partner is called"
        def response = userResource.deleteAccount(user)
        then: "response should contain status 200 CREATED"
        response.statusCodeValue == 200
    }
}
