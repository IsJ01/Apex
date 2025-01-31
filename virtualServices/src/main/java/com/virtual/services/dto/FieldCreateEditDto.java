package com.virtual.services.dto;

import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
@Validated
public class FieldCreateEditDto {

    @NotNull
    String name;

    String value;

    @NotNull
    Long rowId;
}
