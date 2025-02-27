package com.tasks.api.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Base64;

import org.springframework.stereotype.Service;

import com.tasks.api.database.entity.FileInfo;

@Service
public class FileService {

    public String getBytesFromFile(FileInfo fileInfo) throws Exception {
        File file = new File("./files/" +  fileInfo.getId().toString());
        if (file.exists()) {
            InputStream inputStream = new FileInputStream("./files/" +  fileInfo.getId().toString());
            byte[] bytes = inputStream.readAllBytes();
            inputStream.close();
            return Base64.getEncoder().encodeToString(bytes);
        } else {
            return "";
        }
    }
    
}
