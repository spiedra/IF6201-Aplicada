package com.bytecode.core.service;

import java.io.File;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.bytecode.core.exception.FileStorageException;

@Service
public class FileService {

  //  @Value("${app.upload.dir:/prueba-IMG/src/main/resources/templates}")
    public String uploadDir;

    public void uploadFile(MultipartFile file) {

    	String path = "src/main/resources/static/images";

    	File filee = new File(path);
    	String absolutePath = filee.getAbsolutePath();

    	System.out.println(absolutePath);

        try {
         
            Path copyLocation = Paths
                .get(absolutePath + File.separator + StringUtils.cleanPath(file.getOriginalFilename()));
            Files.copy(file.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
            throw new FileStorageException("Could not store file " + file.getOriginalFilename()
                + ". Please try again!");
        }
    }
}