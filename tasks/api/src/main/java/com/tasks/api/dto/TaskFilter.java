package com.tasks.api.dto;

import com.tasks.api.database.entity.Status;

import lombok.Value;

@Value
public class TaskFilter {
    Integer of;
    Integer responsible;
    String title;
    String description;
    String firstDate;
    String lastDate;
    Boolean repetitive;
    Boolean checked;
    Status status;
}
