package com.bookingally.service.images.rest.resources;

import com.amazonaws.SdkClientException;
import com.bookingally.service.common.database.models.Partner;
import com.bookingally.service.common.rest.security.JwtTokenUtil;
import com.bookingally.service.common.rest.security.UserDetailsService;
import com.bookingally.service.images.rest.models.ImageDeleteRequest;
import com.bookingally.service.images.rest.models.ImageUploadResponse;
import com.bookingally.service.images.util.BucketClient;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * This is the image management resource for carrying out CRUD operation on the image storage bucket.
 * @author Nicholas Murray
 */
@RestController
@RequestMapping("/service")
public class ImageResource {

    @Autowired
    private BucketClient bucketClient;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Accepts an image to upload to AWS S3 storage bucket. Checks to see if the User trying to uploads is a partner before
     * uploading the image file
     * @param image - the image to be uploaded
     * @param token - the authorisation token.
     * @return {@link ImageUploadResponse} which contains the url for the newly uploaded image.
     */
    @PostMapping()
    public ResponseEntity<?> uploadImage(@RequestPart("file") MultipartFile image, @RequestHeader("Authorization") String token) {
        try {
            Partner partner = checkToken(token);
            String imageUrl = bucketClient.uploadImage(image, partner);
            return new ResponseEntity<>(new ImageUploadResponse(imageUrl), HttpStatus.CREATED);
        } catch (Exception e) {
            String message = "Failed to upload image: " + e.getMessage();
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Deletes a given image based on the file name, from the AWS S3 storage bucket. Checks the user to see if the user if of type
     * Partner before deleting the image.
     * @param image - {@link ImageDeleteRequest} which contains the name of the image to be deleted.
     * @param token - the authorisation token.
     * @return Status 200 ok if successful, and 400 if unsuccessful
     */
    @DeleteMapping()
    public ResponseEntity<?> deleteImage(@RequestBody ImageDeleteRequest image, @RequestHeader("Authorization") String token) {
        try {
            checkToken(token);
            bucketClient.deleteImage(image.getImage());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            String message = "Failed to delete image: " + e.getMessage();
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    private Partner checkToken(String token) throws ClassCastException {
        token = token.split(" ")[1];
        String username = jwtTokenUtil.getUsernameFromToken(token);
        List<Object> user = userDetailsService.loadUserAccount(username);

        return (Partner) user.get(1);
    }
}
