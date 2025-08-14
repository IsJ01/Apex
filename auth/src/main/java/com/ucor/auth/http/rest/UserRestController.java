package com.ucor.auth.http.rest;

import org.springframework.web.bind.annotation.RestController;

import com.ucor.auth.database.entity.User;
import com.ucor.auth.dto.UserReadDto;
import com.ucor.auth.mapper.AuthCookieMapper;
import com.ucor.auth.mapper.UserReadMapper;
import com.ucor.auth.service.UserDetailsServiceImpl;

import lombok.RequiredArgsConstructor;

import java.io.UnsupportedEncodingException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequiredArgsConstructor
public class UserRestController {

    private final UserDetailsServiceImpl userDetailsService;
    private final UserReadMapper userReadMapper;
    private final AuthCookieMapper authCookieMapper;

    @GetMapping("api/v1/public/users/{id}")
    public UserReadDto findById(@PathVariable Long id) {
        return userReadMapper.map((User) userDetailsService.findById(id));
    }

    @GetMapping("api/v1/users/current")
    public UserReadDto current(@AuthenticationPrincipal UserDetails userDetails) {
        return userReadMapper.map((User) userDetails);
    }

    @PostMapping("api/v1/users/logout")
    public ResponseEntity<?> logout() throws UnsupportedEncodingException {
        return ResponseEntity.ok()
            .header("Set-Cookie", authCookieMapper.getLogoutCookie().toString())
            .build();
    }

}
