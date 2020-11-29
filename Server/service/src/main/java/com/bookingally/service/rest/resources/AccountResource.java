package com.bookingally.service.rest.resources;

import com.bookingally.service.database.models.Account;
import com.bookingally.service.database.models.AuthResponse;
import com.bookingally.service.database.repositories.AccountRepository;
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

/**
 * A REST Controller that can be used to carry our CRUD operations for {@link Account} entities persisted in the database
 * @author Nicholas Murray
 */
@CrossOrigin
@RestController
@RequestMapping("/account")
public class AccountResource {

    @Autowired
    private AccountRepository accountRepository;

    /**
     * Returns a {@link ResponseEntity} with the requested {@link Account} entity from the
     * database within its response body.
     * @return {@link ResponseEntity< Account >} response containing the Partner in the body.
     */
    @GetMapping("/{user}")
    public ResponseEntity<Account> getAccount(@PathVariable String user ) {
        Optional<Account> account = accountRepository.findByUsername(user);
        return account.map(value -> ResponseEntity.ok(value)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Persists a given {@link Account} in the database, then returns the persisted object. This can
     * be used to update and existing partner. To update an existing partner the id should be that of
     * the partner to be updated.
     * @param account the new {@link Account} to be persisted in the database
     * @return {@link ResponseEntity<  Account  >} a response entity containing the saved persistence entity in its response body
     */
    @PostMapping()
    public ResponseEntity<Account> updateAccount(@RequestBody Account account) {
        final Account savedAccount = accountRepository.save(account);
        savedAccount.setPassword("");
        return new ResponseEntity<>(savedAccount,HttpStatus.CREATED);
    }

    /**
     * Deletes the given {@link Account} from the Database.
     * @return {@link ResponseEntity} response with {@link HttpStatus} 200 OK if delete is successful.
     */
    @DeleteMapping()
    public ResponseEntity deleteAccount(@RequestBody Account account) {
        accountRepository.delete(account);
        return new ResponseEntity(HttpStatus.OK);
    }
}
