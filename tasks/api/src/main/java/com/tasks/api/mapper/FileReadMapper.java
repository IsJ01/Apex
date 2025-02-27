package com.tasks.api.mapper;

import org.springframework.stereotype.Component;

import com.tasks.api.database.entity.FileInfo;
import com.tasks.api.dto.FileInfoReadDto;
import com.tasks.api.service.FileService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FileReadMapper implements Mapper<FileInfo, FileInfoReadDto> {

    private final FileService fileService;

    @Override
    public FileInfoReadDto map(FileInfo object)  {
        try {
            return new FileInfoReadDto(
                object.getId(), 
                object.getFileName(), 
                object.getSize(),
                fileService.getBytesFromFile(object)
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
