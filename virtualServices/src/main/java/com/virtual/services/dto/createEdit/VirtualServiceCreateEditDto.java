package com.virtual.services.dto.createEdit;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class VirtualServiceCreateEditDto {
    @NotNull
    String name;
}
