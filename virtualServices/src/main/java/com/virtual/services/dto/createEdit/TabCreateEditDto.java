package com.virtual.services.dto.createEdit;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class TabCreateEditDto {

    @NotNull
    Long serviceId;

    @NotNull
    String name;
}
