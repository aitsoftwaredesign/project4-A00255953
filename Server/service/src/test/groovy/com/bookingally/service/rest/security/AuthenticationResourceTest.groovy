package com.bookingally.service.rest.security


import com.bookingally.service.database.models.Account
import com.bookingally.service.database.models.AuthRequest
import com.bookingally.service.main.BookingAllyApplication
import com.bookingally.service.rest.resources.AuthenticationResource
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.authentication.AuthenticationManager

import org.springframework.security.core.userdetails.UsernameNotFoundException
import spock.lang.Specification

@SpringBootTest(classes = BookingAllyApplication.class)
class AuthenticationResourceTest extends Specification{

    AuthRequest userAuth = new AuthRequest("testUser1", "password1")

    UserDetailsService userDetailsService = Mock()
    AuthenticationManager authenticationManager = Mock()

    def jwtTokenUtil = new JwtTokenUtil()

    def authenticationResource = new AuthenticationResource()

    def setup() {
        org.springframework.security.core.Authentication auth = Mock()
        auth.isAuthenticated() >> true

        authenticationManager.authenticate(auth)
        authenticationResource.authenticationManager = authenticationManager

        jwtTokenUtil.secret = "secret"
        authenticationResource.jwtTokenUtil  = jwtTokenUtil
    }

    def "When create authentication token is called with a valid auth request return OK 200"() {
        given: "A userdetails service that will return a valid User details"
            userDetailsService.loadUserByUsername(userAuth.getUsername()) >>
                    new org.springframework.security.core.userdetails.User(userAuth.getUsername(), userAuth.getPassword(), new ArrayList<>())
            authenticationResource.userDetailsService = userDetailsService
        when: "A valid auth request is given"
            def response = authenticationResource.createAuthenticationToken(userAuth)
        then: "A status OK should be returned"
            response.statusCodeValue == 200
    }

    def "When create authentication token is called with an invalid auth request return Invalid 401"() {
        given: "A userdetails service that will throw an exception"
            userDetailsService.loadUserByUsername(userAuth.getUsername()) >> {
                throw new UsernameNotFoundException("No user found with username: " + userAuth.username)}
            authenticationResource.userDetailsService = userDetailsService
        when: "An invalid auth request is given"
            authenticationResource.createAuthenticationToken(userAuth)
        then: "A status OK should be returned"
            thrown(UsernameNotFoundException)
    }
}
