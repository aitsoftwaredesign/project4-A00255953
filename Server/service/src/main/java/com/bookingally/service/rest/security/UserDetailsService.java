package com.bookingally.service.rest.security;

import com.bookingally.service.database.models.Account;
import com.bookingally.service.database.repositories.AccountRepository;
import java.util.ArrayList;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Account> response = accountRepository.findByUsername(username);
        Account account = response.map(value -> value).orElseGet(() -> null);
        if (account == null) {
            throw new UsernameNotFoundException("No user found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(account.getUsername(), account.getPassword(),
                new ArrayList<>());
    }

    public Account save(Account account) {
        Account newAccount = new Account();
        newAccount.setUsername(account.getUsername());
        newAccount.setPassword(bcryptEncoder.encode(account.getPassword()));
        return accountRepository.save(newAccount);
    }
}
