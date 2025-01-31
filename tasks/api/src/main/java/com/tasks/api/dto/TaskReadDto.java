package com.tasks.api.dto;

import com.tasks.api.database.entity.Status;

import lombok.Value;

@Value
public class TaskReadDto {
    Integer id;
    Integer of;
    Integer near;
    String description;
    Status status;
}
