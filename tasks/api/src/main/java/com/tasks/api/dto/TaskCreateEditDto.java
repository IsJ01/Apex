package com.tasks.api.dto;

import org.springframework.web.multipart.MultipartFile;

import com.tasks.api.database.entity.Status;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Value;
import lombok.experimental.FieldNameConstants;

@Value
@FieldNameConstants
public class TaskCreateEditDto {
    
    @NotNull
    Integer of;

    @NotNull
    Integer responsible;

    @NotNull
    @NotEmpty
    String title;

    String description;

    Boolean repetitive;

    Boolean checked;

    MultipartFile file;

    String lastDate;

    Status status;
}
