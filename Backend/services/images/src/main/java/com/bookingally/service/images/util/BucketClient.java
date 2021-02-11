package com.bookingally.service.images.util;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.bookingally.service.common.database.models.Partner;
import com.bookingally.service.common.pojo.BucketVariables;
import com.bookingally.service.common.util.ImageUploadKeyUtil;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * This is a utility for carrying out CRUD operations on the image bucket.
 * @author Nicholas Murray
 */
@Component
public class BucketClient {

    private ImageUploadKeyUtil uploadKeyUtil = new ImageUploadKeyUtil();

    private AWSCredentials credentials;

    private AmazonS3 s3Client;

    private BucketVariables var;

    private String url = "https://<bucket>.s3.amazonaws.com/<image>";

    public BucketClient() {
        var = uploadKeyUtil.getUploadValues();
        credentials = new BasicAWSCredentials(var.getKey(), var.getSecret());

        if(s3Client == null) {
            s3Client = AmazonS3ClientBuilder
                    .standard()
                    .withCredentials(new AWSStaticCredentialsProvider(credentials))
                    .withRegion(Regions.US_EAST_1)
                    .build();
        }
    }

    public String uploadImage(MultipartFile image, Partner partner) throws IOException {
        File file = new File(image.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(image.getBytes());
        fos.close();

        String fileName = "venues/" + partner.getId() + "/" + file.getName();
        s3Client.putObject(new PutObjectRequest(var.getBucket(), fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        return getUrl(fileName);
    }

    public void deleteImage(String fileName) throws SdkClientException {
        s3Client.deleteObject(var.getBucket(), fileName);
    }

    private String getUrl(String fileName) {
        String imageUrl = url;

        imageUrl = imageUrl.replace("<bucket>", var.getBucket());
        imageUrl = imageUrl.replace("<image>", fileName);

        return imageUrl;
    }

    public AWSCredentials getCredentials() {
        return credentials;
    }
}
