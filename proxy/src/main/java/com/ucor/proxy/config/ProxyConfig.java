package com.ucor.proxy.config;

import java.io.IOException;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableAsync
@EnableWebSecurity
public class ProxyConfig {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        

        HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
        requestFactory.setConnectTimeout(3_000);
        requestFactory.setReadTimeout(3_000);

        restTemplate.setRequestFactory(requestFactory);

        restTemplate.setErrorHandler(new ResponseErrorHandler() {
            @Override
            public boolean hasError(ClientHttpResponse response) throws IOException {
                return false;
            }

            @Override
            public void handleError(ClientHttpResponse response) throws IOException {
            }
        });
        return restTemplate;
    }

    @SuppressWarnings({ "removal", "deprecation" })
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .httpBasic(AbstractHttpConfigurer::disable)
            .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(req -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowedHeaders(List.of("Api-Request", "Content-Type", "Origin", "Access-Control-Allow-Origin"));
                    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE"));
                    configuration.setAllowedOrigins(List.of("https://localhost:80", "http://localhost:3000"));
                    configuration.setAllowCredentials(true);
                    return configuration;
                }))
            .authorizeRequests(req -> req.anyRequest().permitAll())
            .build();
    }

}
