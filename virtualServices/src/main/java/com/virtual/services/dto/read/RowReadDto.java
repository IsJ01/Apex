package com.virtual.services.dto.read;

import java.util.List;

import lombok.Value;

@Value
public class RowReadDto {
    Long id;
    Long tabId;
    List<FieldReadDto> fields;
}
