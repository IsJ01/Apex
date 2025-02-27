package com.tasks.api.dto;

import com.tasks.api.database.entity.Status;

import lombok.Value;

@Value
public class TaskFilter {
    Integer of;
    Integer responsible;
    String description;
    Boolean repetitive;
    Boolean checked;
    Status status;
}
