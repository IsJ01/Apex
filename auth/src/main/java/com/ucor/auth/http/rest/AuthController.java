package com.ucor.auth.http.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucor.auth.dto.JwtResponse;
import com.ucor.auth.dto.SignIn;
import com.ucor.auth.dto.SignUp;
import com.ucor.auth.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static org.springframework.http.ResponseEntity.status;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    @Value("${mode}")
    private String mode;

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody @Validated SignUp signUp) 
            throws UnsupportedEncodingException {
        String token = authService.signUp(signUp);
        return status(201)
            .body(new JwtResponse(token));
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody @Validated SignIn signIn) 
            throws UnsupportedEncodingException {
        String token = authService.signIn(signIn);
        return status(201)
            .body(new JwtResponse(token));
    }
    
}
