package com.virtual.services.dto.createEdit;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class ColCreateEditDto {
    
    @NotNull
    Long tabId;

    @NotNull
    @NotEmpty
    String value;
}
