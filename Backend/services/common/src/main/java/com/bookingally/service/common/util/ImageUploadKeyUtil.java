package com.bookingally.service.common.util;

import com.bookingally.service.common.pojo.BucketVariables;
import java.io.Serializable;
import org.springframework.stereotype.Component;

/**
 * This is a utility for retrieving the image bucket properties.
 * @author Nicholas Murray
 */
@Component
public class ImageUploadKeyUtil implements Serializable {

    /**
     * Retrieves the variables needed to create an {@link BucketVariables} needed to upload
     * images to the aws storage bucket.
     * @return {@link BucketVariables}
     */
    public BucketVariables getUploadValues() {
        String bucket = VariableRetriever.getVariable("BUCKET_NAME", "booking-ally-images");
        String key = VariableRetriever.getVariable("ACCESS_KEY", "access-key");
        String secret = VariableRetriever.getVariable("SECRET_ACCESS_KEY", "secret");
        return new BucketVariables(bucket, key, secret);
    }
}
