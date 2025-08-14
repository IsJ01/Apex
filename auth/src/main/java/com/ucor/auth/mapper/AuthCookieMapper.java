package com.ucor.auth.mapper;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class AuthCookieMapper {

    @Value("${mode}")
    private String mode;

    public ResponseCookie getCookie(String token) throws UnsupportedEncodingException {
        ResponseCookie cookie = ResponseCookie.from("Authorization", URLEncoder.encode("Bearer " + token, "UTF-8"))
            .path("/")
            .maxAge(60 * 60 * 6)
            .httpOnly(true)
            .secure(true)
            .sameSite(mode.equals("dev") ? "None" : "Strict")
            .build();
        return cookie;
    }

    public ResponseCookie getLogoutCookie() throws UnsupportedEncodingException {
        ResponseCookie cookie = ResponseCookie.from("Authorization", "")
            .path("/")
            .maxAge(60 * 60 * 6)
            .httpOnly(true)
            .secure(true)
            .sameSite(mode.equals("dev") ? "None" : "Strict")
            .build();
        return cookie;
    }

}
