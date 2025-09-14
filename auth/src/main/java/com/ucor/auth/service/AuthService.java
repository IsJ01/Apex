package com.ucor.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ucor.auth.dto.SignIn;
import com.ucor.auth.dto.SignUp;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String signUp(SignUp signUp) {
        var req = new SignUp(
            signUp.getUsername(), 
            passwordEncoder.encode(signUp.getPassword()),
            signUp.getTelephoneNumber(),
            signUp.getYear()
        );
        UserDetails user = userService.create(req);
        return jwtService.generateToken(user);
    }

    public String signIn(SignIn signIn) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            signIn.getUsername(),
            signIn.getPassword()
        ));
        UserDetails user = userDetailsService.loadUserByUsername(signIn.getUsername());
        return jwtService.generateToken(user);
    }

}
