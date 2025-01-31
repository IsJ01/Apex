package com.virtual.services.dto;

import lombok.Value;

@Value
public class FieldReadDto {
    Long id;
    String name;
    String value;
    Long rowId;
}
