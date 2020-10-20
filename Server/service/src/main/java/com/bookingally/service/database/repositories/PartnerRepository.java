package com.bookingally.service.database.repositories;

import com.bookingally.service.database.models.Partner;
import org.springframework.data.repository.CrudRepository;

public interface PartnerRepository extends CrudRepository<Partner, Integer> {
}
