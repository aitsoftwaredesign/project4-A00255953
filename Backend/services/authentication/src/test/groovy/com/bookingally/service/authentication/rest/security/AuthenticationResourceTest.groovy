package com.bookingally.service.authentication.rest.security

import com.bookingally.service.authentication.main.AuthenticationApplication
import com.bookingally.service.authentication.rest.resources.AuthenticationResource
import com.bookingally.service.common.database.models.AuthRequest
import com.bookingally.service.common.rest.security.JwtTokenUtil
import com.bookingally.service.common.rest.security.UserDetailsService
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UsernameNotFoundException
import spock.lang.Specification

@SpringBootTest(classes = AuthenticationApplication.class)
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
                    new User(userAuth.getUsername(), userAuth.getPassword(), new ArrayList<>())
            authenticationResource.userDetailsService = userDetailsService
        when: "A valid auth request is given"
            def response = authenticationResource.createAuthenticationToken(userAuth, false)
        then: "A status OK should be returned"
            response.statusCodeValue == 200
    }

    def "When create authentication token is called with an invalid auth request return Invalid 401"() {
        given: "A userdetails service that will throw an exception"
            userDetailsService.loadUserByUsername(userAuth.getUsername()) >> {
                throw new UsernameNotFoundException("No user found with username: " + userAuth.username)}
            authenticationResource.userDetailsService = userDetailsService
        when: "An invalid auth request is given"
            authenticationResource.createAuthenticationToken(userAuth, false)
        then: "A status OK should be returned"
            thrown(UsernameNotFoundException)
    }
}
