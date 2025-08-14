package com.ucor.auth.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class SignUp {

    @NotNull
    String username;

    @NotNull
    String password;

    String telephoneNumber;

    Integer year;
    
}
