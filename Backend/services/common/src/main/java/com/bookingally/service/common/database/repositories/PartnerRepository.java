package com.bookingally.service.common.database.repositories;

import com.bookingally.service.common.database.models.Partner;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PartnerRepository extends MongoRepository<Partner, String> {
    Optional<Partner> findById(String id);

    Optional<Partner> findByUsername(String username);

    Optional<Partner> findByEmail(String email);
}
