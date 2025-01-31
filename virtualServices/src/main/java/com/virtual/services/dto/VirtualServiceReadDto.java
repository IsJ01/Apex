package com.virtual.services.dto;

import java.util.List;

import lombok.Value;

@Value
public class VirtualServiceReadDto {
    Long id;
    String name;
    List<RowReadDto> rows;
}
