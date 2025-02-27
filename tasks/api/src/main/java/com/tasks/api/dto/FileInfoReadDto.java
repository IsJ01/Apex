package com.tasks.api.dto;

import lombok.Value;

@Value
public class FileInfoReadDto {
    Long id;
    String fileName;
    Long size;
    String stringBytes;
}
