package com.virtual.services.dto.read;

import java.util.List;

import lombok.Value;

@Value
public class TabReadDto {
    Long id;
    Long serviceId;
    String name;
    List<RowReadDto> rows;
    List<ColReadDto> cols;
}
