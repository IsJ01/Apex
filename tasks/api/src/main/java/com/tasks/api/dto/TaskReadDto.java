package com.tasks.api.dto;

import java.time.LocalDate;

import com.tasks.api.database.entity.Status;

import lombok.Value;

@Value
public class TaskReadDto {
    Integer id;
    Integer of;
    Integer responsible;
    String title;
    String description;
    FileInfoReadDto file;
    LocalDate firstDate;
    LocalDate lastDate;
    Boolean checked;
    Boolean repetitive;
    Status status;
}
