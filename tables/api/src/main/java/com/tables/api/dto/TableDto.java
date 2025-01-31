package com.tables.api.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Value;

@Value
public class TableDto {
    @NotEmpty
    String fileName;

    @NotEmpty
    String[] headers_;

    String[][] rows;
}
