package com.pages.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class PropertyCreateEditDto {

    @NotNull
    private Long elementId;

    @NotEmpty
    private String name;

    private String value;

}
