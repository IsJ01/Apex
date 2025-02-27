package com.tasks.api.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.tasks.api.database.entity.FileInfo;
import com.tasks.api.database.repository.FileInfoRepository;
import com.tasks.api.dto.FileInfoReadDto;
import com.tasks.api.mapper.FileReadMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class FileInfoService {

    private final FileInfoRepository fileInfoRepository;
    private final FileReadMapper fileReadMapper;

    public Optional<FileInfoReadDto> findById(Long id) {
        return fileInfoRepository.findById(id)
            .map(fileReadMapper::map);
    }

    @Transactional
    public FileInfoReadDto create(MultipartFile file) throws Exception {
        FileInfo fileInfo = new FileInfo();
        fileInfo.setFileName(file.getOriginalFilename());
        fileInfo = fileInfoRepository.save(fileInfo);
        fileInfo.setSize(file.getSize());

        File file2 = new File("./files/" + fileInfo.getId().toString());
        file2.createNewFile();

        try (OutputStream outputStream = new FileOutputStream(file2.getAbsolutePath())) {
            outputStream.write(file.getBytes());
        }
        
        return fileReadMapper.map(fileInfo);
    }

    @Transactional
    public boolean delete(Long id) {
        return fileInfoRepository.findById(id)
            .map(entity -> {
                try {
                    File file = new File("./files/" + entity.getId().toString());
                    file.delete();
                    fileInfoRepository.delete(entity);
                    return true;
                } catch (Exception e) {
                    return false;
                }
            })
            .orElse(false);
    }

}
