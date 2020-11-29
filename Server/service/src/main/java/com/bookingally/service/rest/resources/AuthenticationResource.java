package com.bookingally.service.rest.resources;

import com.bookingally.service.database.models.AuthRequest;
import com.bookingally.service.database.models.AuthResponse;
import com.bookingally.service.database.models.Account;

import com.bookingally.service.rest.security.JwtTokenUtil;
import com.bookingally.service.rest.security.UserDetailsService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AuthenticationResource {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Creates a Json Web Token for a given user when given valid credentials.
     * @param authRequest the credentials to be authenticated
     * @return {@link AuthResponse} a response entity that contains the jwt
     */
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {

        authenticate(authRequest.getUsername(), authRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(token));
    }

    /**
     * Persists a given {@link Account} in the database, then returns the persisted object. This can
     * be used to create a new partner or update and existing partner. To create a new partner the id value
     * of partner must be null, likewise to update an existing partner the id should be that of the partner to
     * be updated.
     * @param account the new {@link Account} to be persisted in the database
     * @return {@link ResponseEntity<  Account  >} a response entity containing the saved persistence entity in its response body
     */
    @PostMapping("/register")
    public ResponseEntity<?> savePartner(@RequestBody Account account) {
        try {
            userDetailsService.loadUserByUsername(account.getUsername());
            return ResponseEntity.status(409).body("Account already exists");
        } catch (UsernameNotFoundException e) {
            Account savedAccount = userDetailsService.save(account);
            savedAccount.setPassword("");
            return new ResponseEntity<>(savedAccount, HttpStatus.CREATED);
        }
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
