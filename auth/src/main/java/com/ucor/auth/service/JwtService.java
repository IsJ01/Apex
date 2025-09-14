package com.ucor.auth.service;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.ucor.auth.database.entity.User;
import com.ucor.auth.dto.CategoryReadDto;
import com.ucor.auth.mapper.CategoryReadMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${token.signing}")
    private String SIGING_TOKEN;
    private final CategoryReadMapper categoryReadMapper;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        
        if (userDetails instanceof User user) {
            List<CategoryReadDto> categories = user.getCategories()
                .stream()
                .map(categoryReadMapper::map)
                .toList();
            claims.put("id", user.getId());
            claims.put("role", user.getRole().name());
            claims.put("categories", categories);
        }

        return generateToken(userDetails, claims);

    }

    private String generateToken(UserDetails userDetails, Map<String, Object> claims) {
        return Jwts.builder()
            .subject(userDetails.getUsername())
            .claims(claims)
            .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 6))
            .signWith(getSigningKey())
            .compact();
    }

    public boolean isTokenValid(String token) {
        return extractExpiration(token).after(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> func) {
        Claims claims = extractAllClaims(token);
        return func.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(SIGING_TOKEN));
    }

}
