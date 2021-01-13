package com.bookingally.service.common.rest.resources;

import com.bookingally.service.common.database.models.Account;
import com.bookingally.service.common.database.models.Customer;
import com.bookingally.service.common.database.repositories.CustomerRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * A REST Controller that can be used to carry our CRUD operations for {@link Customer} entities persisted in the database
 * @author Nicholas Murray
 */

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerResource {

    @Autowired
    private CustomerRepository customerRepository;

    /**
     * Returns a {@link ResponseEntity} with the requested {@link Customer} entity from the
     * database within its response body.
     * @return {@link ResponseEntity<  Customer  >} response containing the Customer in the body.
     */
    @GetMapping("/{user}")
    public ResponseEntity<Customer> getAccount(@PathVariable String user ) {
        Optional<Customer> customer = customerRepository.findByUsername(user);
        return customer.map(value -> new ResponseEntity(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity(HttpStatus.NOT_FOUND));
    }

    /**
     * Updates a given {@link Customer} in the database, then returns the persisted object.
     * To update an existing customer the id should be that of the customer to be updated.
     * @param customer the new {@link Account} to be persisted in the database
     * @return {@link ResponseEntity< Customer >} a response entity containing the saved persistence entity in its response body
     */
    @PostMapping()
    public ResponseEntity<Customer> updateAccount(@RequestBody Customer customer) {
        final Customer savedCustomer = customerRepository.save(customer);
        savedCustomer.setPassword("");
        return new ResponseEntity(savedCustomer,HttpStatus.CREATED);
    }

    /**
     * Deletes the given {@link Customer} from the Database.
     * @return {@link ResponseEntity} response with {@link HttpStatus} 200 OK if delete is successful.
     */
    @DeleteMapping()
    public ResponseEntity deleteAccount(@RequestBody Customer customer) {
        customerRepository.delete(customer);
        return new ResponseEntity(HttpStatus.OK);
    }


}
