package com.bookingally.service.common.rest.resources;

import com.bookingally.service.common.database.models.Partner;
import com.bookingally.service.common.database.repositories.PartnerRepository;
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
 * A REST Controller that can be used to carry our CRUD operations for {@link Partner} entities persisted in the database
 * @author Nicholas Murray
 */

@RestController
@CrossOrigin
@RequestMapping("/partner")
public class PartnerResource {

    @Autowired
    private PartnerRepository partnerRepository;

    /**
     * Returns a {@link ResponseEntity} with the requested {@link Partner} entity from the
     * database within its response body.
     * @return {@link ResponseEntity<  Partner  >} response containing the Partner in the body.
     */
    @GetMapping("/{user}")
    public ResponseEntity<Partner> getAccount(@PathVariable String user ) {
        Optional<Partner> account = partnerRepository.findByUsername(user);
        return account.map(value -> new ResponseEntity(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity(HttpStatus.NOT_FOUND));
    }

    /**
     * Updates a given {@link Partner} in the database, then returns the persisted object.
     * To update an existing partner the id should be that of the partner to be updated.
     * @param partner the new {@link Partner} to be persisted in the database
     * @return {@link ResponseEntity< Partner >} a response entity containing the saved persistence entity in its response body
     */
    @PostMapping()
    public ResponseEntity<Partner> updateAccount(@RequestBody Partner partner) {
        final Partner savedPartner = partnerRepository.save(partner);
        savedPartner.setPassword("");
        return new ResponseEntity<>(savedPartner,HttpStatus.CREATED);
    }

    /**
     * Deletes the given {@link Partner} from the Database.
     * @return {@link ResponseEntity} response with {@link HttpStatus} 200 OK if delete is successful.
     */
    @DeleteMapping()
    public ResponseEntity deleteAccount(@RequestBody Partner partner) {
        partnerRepository.delete(partner);
        return new ResponseEntity(HttpStatus.OK);
    }


}
