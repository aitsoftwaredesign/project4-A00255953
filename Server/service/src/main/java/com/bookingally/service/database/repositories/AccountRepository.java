package com.bookingally.service.database.repositories;

import com.bookingally.service.database.models.Account;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AccountRepository extends MongoRepository<Account, String> {
    Optional<Account> findById(String id);

    Optional<Account> findByUsername(String username);
}
