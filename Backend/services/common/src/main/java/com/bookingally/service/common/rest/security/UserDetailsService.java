package com.bookingally.service.common.rest.security;

import com.bookingally.service.common.AccountTypes;
import com.bookingally.service.common.database.models.Account;
import com.bookingally.service.common.database.models.Customer;
import com.bookingally.service.common.database.models.Partner;
import com.bookingally.service.common.database.repositories.CustomerRepository;
import com.bookingally.service.common.database.repositories.PartnerRepository;
import java.util.ArrayList;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Logger logger = LoggerFactory.getLogger(UserDetailsService.class);

    /**
     * Searches for either a {@link Partner} or {@link Customer} account by the given username, we check for either account
     * to prevent the re-use of usernames and possible problems with unauthorized access to partner accounts.
     * @param username
     * @return the user credentials
     * @throws UsernameNotFoundException
     */

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserDetails userDetails = null;
        try {
            Customer storedCustomer = getCustomer(username).get();
            userDetails= new User(storedCustomer.getUsername(), storedCustomer.getPassword(), new ArrayList<>());
        } catch (NoSuchElementException e) {
            logger.warn("No Customer found with username:" + username);
        }

        if(userDetails == null) {
            try {
                Partner storedPartner = getPartner(username).get();
                userDetails = new User(storedPartner.getUsername(), storedPartner.getPassword(), new ArrayList<>());
            } catch (NoSuchElementException e) {
                logger.warn("No Partner found with username:" + username);
                throw new UsernameNotFoundException("No user found with username: " + username);
            }
        }

        return userDetails;
    }

    /**
     * Loads either a Customer or Partner account based on the username given. Throws a {@link UsernameNotFoundException}
     * if the given username is not found.
     * @param username - the username to search for.
     * @return either a Partner or Customer account.
     */
    public List<Object> loadUserAccount(String username) {
        Account account = null;
        String type = AccountTypes.CUSTOMER.getLabel();
        try {
            account = getCustomer(username).get();
        } catch (NoSuchElementException e) {
            logger.warn("No Customer found with username:" + username);
        }

        if(account == null) {
            try {
                account = getPartner(username).get();
                type = AccountTypes.PARTNER.getLabel();
            } catch (NoSuchElementException e) {
                logger.warn("No Partner found with username:" + username);
                throw new UsernameNotFoundException("No user found with username: " + username);
            }
        }

        //Remove the password from the object
        account.setPassword("");
        List<Object> response = new ArrayList<Object>();
        response.add(type);
        response.add(account);
        return response;
    }

    private Optional<Customer> getCustomer(String username) {
        Optional<Customer> customer = customerRepository.findByUsername(username);
        if(customer.isPresent()) {
            Customer storedCustomer = customer.get();
            return Optional.of( storedCustomer);
        } else {
            return Optional.empty();
        }
    }

    private Optional<Partner> getPartner(String username) {
        Optional<Partner> partner = partnerRepository.findByUsername(username);
        if(partner.isPresent()) {
            Partner storedPartner = partner.get();
            return Optional.of( storedPartner);
        } else {
            return Optional.empty();
        }
    }

    /**
     * Saves the given {@link Customer} to the repository. Does not check for existing usernames.
     * @param customer
     * @return
     */
    public Customer save(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        return customerRepository.save(customer);
    }

    /**
     * Saves the given {@link Partner} to the repository. Does not check for existing usernames.
     * @param partner
     * @return
     */
    public Partner save(Partner partner) {
        partner.setPassword(passwordEncoder.encode(partner.getPassword()));
        return partnerRepository.save(partner);
    }

}
