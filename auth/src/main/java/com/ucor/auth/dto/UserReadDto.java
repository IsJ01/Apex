package com.ucor.auth.dto;

import java.util.List;

import lombok.Value;

@Value
public class UserReadDto {
    Long id;
    String username;
    String telephoneNumber;
    Integer year;
    String role;
    List<CategoryReadDto> categories;
}
