package com.bookingally.service.common.pojo;

import java.io.Serializable;

public class UploadResponse implements Serializable {

    private String bucket;

    private String key;

    private String secret;

    public UploadResponse(String bucket, String key, String secret) {
        this.bucket = bucket;
        this.key = key;
        this.secret = secret;
    }

    public String getBucket() {
        return bucket;
    }

    public String getKey() {
        return key;
    }

    public String getSecret() {
        return secret;
    }
}
