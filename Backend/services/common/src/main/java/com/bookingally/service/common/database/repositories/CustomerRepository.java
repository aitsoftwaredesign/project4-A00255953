package com.bookingally.service.common.database.repositories;

import com.bookingally.service.common.database.models.Customer;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<Customer, String> {
    Optional<Customer> findById(String id);

    Optional<Customer> findByUsername(String username);

    Optional<Customer> findByEmail(String email);
}
