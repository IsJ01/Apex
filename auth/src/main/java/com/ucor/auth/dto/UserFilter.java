package com.ucor.auth.dto;

import java.util.List;

import com.ucor.auth.database.entity.Role;

import lombok.Value;

@Value
public class UserFilter {
    String username;
    String telephoneNumber;
    Integer year;
    Role role;
    List<CategoryCreateDto> categories;
}