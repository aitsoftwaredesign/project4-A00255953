package com.bookingally.service.images.rest.models;

public class ImageUploadResponse {

    private String imageUrl;

    public ImageUploadResponse() {}

    public ImageUploadResponse(String imageUrl){
        setImageUrl(imageUrl);
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
