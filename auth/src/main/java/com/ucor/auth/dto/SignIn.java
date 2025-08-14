package com.ucor.auth.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class SignIn {

    @NotNull
    String username;

    @NotNull
    String password;
    
}
