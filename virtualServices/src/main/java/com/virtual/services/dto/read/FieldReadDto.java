package com.virtual.services.dto.read;

import lombok.Value;

@Value
public class FieldReadDto {
    Long id;
    Long rowId;
    String colName;
    String value;
}
