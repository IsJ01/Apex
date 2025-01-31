package com.pages.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Value;

@Value
public class PageCreateEditDto {
    
    @NotEmpty
    String uri;

}
