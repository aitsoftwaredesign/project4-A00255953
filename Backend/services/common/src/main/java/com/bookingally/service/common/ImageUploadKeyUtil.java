package com.bookingally.service.common;

import com.bookingally.service.common.pojo.UploadResponse;
import java.io.Serializable;
import org.springframework.stereotype.Component;

@Component
public class ImageUploadKeyUtil implements Serializable {

    /**
     * Retrieves the variables needed to create an {@link UploadResponse} needed to upload
     * images to the aws storage bucket.
     * @return {@link UploadResponse}
     */
    public UploadResponse getUploadValues() {
        String bucket = VariableRetriever.getVariable("BUCKET_NAME", "bucket-name");
        String key = VariableRetriever.getVariable("ACCESS_KEY", "access-key");
        String secret = VariableRetriever.getVariable("SECRET_ACCESS_KEY", "secret");
        return new UploadResponse(bucket, key, secret);
    }
}
