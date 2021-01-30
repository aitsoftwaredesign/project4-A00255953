package com.bookingally.service.authentication.rest.resources;

import com.bookingally.service.common.util.ImageUploadKeyUtil;
import com.bookingally.service.common.database.models.Partner;
import com.bookingally.service.common.pojo.AuthRequest;
import com.bookingally.service.common.pojo.AuthResponse;
import com.bookingally.service.common.rest.security.JwtTokenUtil;
import com.bookingally.service.common.rest.security.UserDetailsService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationResource {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private ImageUploadKeyUtil uploadKeyUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    private Logger logger = LoggerFactory.getLogger(UserDetailsService.class);

    /**
     * Creates a Json Web Token for a given user when given valid credentials.
     * @param authRequest the credentials to be authenticated
     * @return {@link AuthResponse} a response entity that contains the jwt
     */
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest, @RequestParam(defaultValue = "false")  boolean returnAccount)
            throws Exception {

        authenticate(authRequest.getUsername(), authRequest.getPassword());

         final UserDetails user = userDetailsService
                .loadUserByUsername(authRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(user);
        AuthResponse response;
        if (!returnAccount) {
            response = new AuthResponse(token);
        } else {
            List<Object> account = userDetailsService.loadUserAccount(authRequest.getUsername());
            response = new AuthResponse(token, account.get(1), (String) account.get(0));
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/tokenuser")
    public ResponseEntity<?> getUserFromToken(@RequestHeader("Authorization") String token ) {
        token = token.split(" ")[1];
        String username = jwtTokenUtil.getUsernameFromToken(token);
        List<Object> user = userDetailsService.loadUserAccount(username);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/upload-key")
    public ResponseEntity<?> getImageUploadKey(@RequestHeader("Authorization") String token ) {
        token = token.split(" ")[1];
        String username = jwtTokenUtil.getUsernameFromToken(token);
        List<Object> user = userDetailsService.loadUserAccount(username);

        try {
            Partner partner = (Partner) user.get(1);
            return ResponseEntity.ok(uploadKeyUtil.getUploadValues());
        } catch (Exception e){
            logger.warn("Invalid account type: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

        private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
