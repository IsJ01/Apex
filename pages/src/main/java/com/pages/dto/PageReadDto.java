package com.pages.dto;

import java.util.List;

import lombok.Value;

@Value
public class PageReadDto {
    Long id;
    String uri;
    List<ElementReadDto> childrens;
}
