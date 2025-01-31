package com.pages.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class ElementCreateEditDto {
    
    @NotNull
    Long pageId;

    Long parentId;

    @NotEmpty
    String value;

}
