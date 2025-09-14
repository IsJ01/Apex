package com.ucor.auth.dto;

import com.ucor.auth.database.entity.Role;

import lombok.Value;

@Value
public class UserPatchDto {
    String password;
    String telephoneNumber;
    Integer year;
    Role role;
}
