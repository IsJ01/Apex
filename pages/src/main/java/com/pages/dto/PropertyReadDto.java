package com.pages.dto;

import lombok.Value;

@Value
public class PropertyReadDto {
    private Long id;
    private Long elementId;
    private String name;
    private String value;
}
