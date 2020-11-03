package com.bookingally.service.rest.resources;

import com.bookingally.service.database.models.Partner;
import com.bookingally.service.database.models.Venue;
import com.bookingally.service.database.repositories.PartnerRepository;
import java.util.List;
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

@CrossOrigin
@RestController
@RequestMapping("/partner")
public class PartnerResource {

    @Autowired
    private PartnerRepository partnerRepository;

    /**
     * Returns a {@link ResponseEntity} with the requested {@link Partner} entity from the
     * database within its response body.
     * @return {@link ResponseEntity<Venue>} response containing the Partner in the body.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Partner> getPartner(@PathVariable Integer id ) {
        Optional<Partner> partner = partnerRepository.findById(id);
        return partner.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    /**
     * Returns a {@link ResponseEntity} with list of all {@link Partner} entities persisted in the
     * database within its response body.
     * @return {@link ResponseEntity<Partner>} response containing the Venues in the body.
     */
    @GetMapping()
    public ResponseEntity<List<Partner>> getAllPartners() {
        List<Partner> partners = (List<Partner>) partnerRepository.findAll();
        return new ResponseEntity<>(partners, HttpStatus.OK);
    }

    /**
     * Persists a given {@link Partner} in the database, then returns the persisted object. This can
     * be used to create a new partner or update and existing partner. To create a new partner the id value
     * of partner must be null, likewise to update an existing partner the id should be that of the partner to
     * be updated.
     * @param partner the new {@link Partner} to be persisted in the database
     * @return {@link ResponseEntity<Partner>} a response entity containing the saved persistence entity in its response body
     */
    @PostMapping()
    public ResponseEntity<Partner> savePartner(@RequestBody Partner partner) {
        final Partner savedPartner = partnerRepository.save(partner);
        return new ResponseEntity<>( savedPartner,HttpStatus.CREATED);
    }

    /**
     * Deletes the given {@link Partner} from the Database.
     * @return {@link ResponseEntity} response with {@link HttpStatus} 200 OK if delete is successful.
     */
    @DeleteMapping()
    public ResponseEntity deletePartner(@RequestBody Partner partner) {
        partnerRepository.delete(partner);
        return new ResponseEntity(HttpStatus.OK);
    }
}
