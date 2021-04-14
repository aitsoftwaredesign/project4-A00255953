package com.bookingally.service.authentication.rest.resources;

import com.bookingally.service.common.database.models.Customer;
import com.bookingally.service.common.database.models.Partner;
import com.bookingally.service.common.rest.security.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/register")
public class RegistrationResource {

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Persists a given {@link Partner} in the database, then returns the persisted object.
     * To create a new partner the id value of partner must be null.
     * @param partner the new {@link Partner} to be persisted in the database
     * @return {@link ResponseEntity<Partner>} a response entity containing the saved persistence entity in its response body
     */
    @PostMapping("/partner")
    public ResponseEntity<?> savePartner(@RequestBody Partner partner) {
        try {
            userDetailsService.loadUserByUsername(partner.getUsername());
            return ResponseEntity.status(409).body("Account already exists for the username: "+partner.getUsername());
        } catch (UsernameNotFoundException e) {
            Partner savedPartner = userDetailsService.save(partner);
            savedPartner.setPassword("");
            return new ResponseEntity<>(savedPartner, HttpStatus.CREATED);
        }
    }

    /**
     * Persists a given {@link Customer} in the database, then returns the persisted object.
     * To create a new partner the id value of partner must be null.
     * @param customer the new {@link Customer} to be persisted in the database
     * @return {@link ResponseEntity<Customer>} a response entity containing the saved persistence entity in its response body
     */
    @PostMapping("/customer")
    public ResponseEntity<?> saveUser(@RequestBody Customer customer) {
        try {
            userDetailsService.loadUserByUsername(customer.getUsername());
            return ResponseEntity.status(409).body("Account already exists for the username: "+customer.getUsername());
        } catch (UsernameNotFoundException e) {
            Customer savedCustomer = userDetailsService.save(customer);
            savedCustomer.setPassword("");
            return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
        }
    }

}
