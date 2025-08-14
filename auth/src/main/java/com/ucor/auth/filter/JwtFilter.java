package com.ucor.auth.filter;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ucor.auth.service.JwtService;
import com.ucor.auth.service.UserDetailsServiceImpl;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    @Value("${cors.allowed-host}")
    private String ALLOWED_HOST;

    private static final String AUTH_PREFIX = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsServiceImpl;

    private String getHeader(Cookie[] cookies) throws UnsupportedEncodingException {
        if (cookies == null) {
            return null;
        }
        for (Cookie cookie: cookies) {
            if (cookie.getName().equals(AUTH_PREFIX)) {
                return URLDecoder.decode(cookie.getValue(), "UTF-8");
            }
        }
        return null;
    }

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request, 
        @NonNull HttpServletResponse response, 
        @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        
        // if (!request.getHeader("Origin").equals(ALLOWED_HOST)) {
        //     filterChain.doFilter(request, response);
        //     return;
        // }
                
        String authHeader = getHeader(request.getCookies());
    
        if (StringUtils.isEmpty(authHeader) || !authHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }
        
        authHeader = authHeader.substring(BEARER_PREFIX.length());

        if (!jwtService.isTokenValid(authHeader) || SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        String username = jwtService.extractUsername(authHeader);

        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
            userDetails, 
            null,
            userDetails.getAuthorities()
        );
        token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        context.setAuthentication(token);
        SecurityContextHolder.setContext(context);

        filterChain.doFilter(request, response);
    }

}
