package com.bookingally.service.database.repositories;

import com.bookingally.service.database.models.Partner;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;

public interface PartnerRepository extends MongoRepository<Partner, String> {
    Optional<Partner> findById(String id);
}
