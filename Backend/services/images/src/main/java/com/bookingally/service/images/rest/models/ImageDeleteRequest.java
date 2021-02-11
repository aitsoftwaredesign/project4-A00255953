package com.bookingally.service.images.rest.models;

public class ImageDeleteRequest {

    private String image;

    public ImageDeleteRequest() {}

    public ImageDeleteRequest(String imageName) {
        setImage(imageName);
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
