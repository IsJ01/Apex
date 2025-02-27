package com.virtual.services.dto.createEdit;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class FieldCreateEditDto {
    
    @NotNull
    Long rowId;
    
    @NotNull
    Long colId;

    String value;
}
