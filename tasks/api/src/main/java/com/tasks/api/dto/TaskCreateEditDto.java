package com.tasks.api.dto;

import com.tasks.api.database.entity.Status;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;
import lombok.experimental.FieldNameConstants;

@Value
@FieldNameConstants
public class TaskCreateEditDto {
    
    @NotNull
    Integer of;

    @NotNull
    Integer near;

    @NotNull
    @Size(min = 3, max = 1000)
    String description;

    Status status;
}
