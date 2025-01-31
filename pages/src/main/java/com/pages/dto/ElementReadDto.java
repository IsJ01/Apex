package com.pages.dto;

import java.util.List;

import lombok.Value;

@Value
public class ElementReadDto {
    private Long id;
    private Long pageId;
    private Long parentId;
    private String value;
    private List<ElementReadDto> childrens;
    private List<PropertyReadDto> properties;
}