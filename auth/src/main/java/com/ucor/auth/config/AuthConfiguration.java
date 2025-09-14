package com.ucor.auth.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.ucor.auth.filter.JwtFilter;
import com.ucor.auth.service.UserDetailsServiceImpl;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableAsync
@EnableWebSecurity
@EnableCaching
@RequiredArgsConstructor
public class AuthConfiguration {
    
    @Value("${cors.allowed-host}")
    private String ALLOWED_HOST;

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @SuppressWarnings({ "removal", "deprecation" })
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(req -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowedHeaders(List.of("*"));
                    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE"));
                    configuration.setAllowedOrigins(List.of(ALLOWED_HOST));
                    configuration.setAllowCredentials(true);
                    return configuration;
                }))
            .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .userDetailsService(userDetailsService)
            .authorizeRequests(req -> req
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

}
