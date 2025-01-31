package com.virtual.services.dto;

import java.util.List;

import lombok.Value;

@Value
public class RowReadDto {
    Long id;
    String name;
    List<FieldReadDto> fields;
    Long serviceId;
}
