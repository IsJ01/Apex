package com.ucor.proxy.http.client;

import java.io.IOException;
import java.net.URI;
import java.util.Enumeration;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class ApiClient {

    private RestTemplate restTemplate;
    private Urls urls;

    public ApiClient(RestTemplate restTemplate, Urls urls) {
        this.restTemplate = restTemplate;
        this.urls = urls;
    }

    public ResponseEntity<?> send(HttpServletRequest request, String servicePath, String requestPath) {
        HttpHeaders headers = new HttpHeaders();

        Enumeration<String> headerNames = request.getHeaderNames();
        if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                String headerValue = request.getHeader(headerName);
                headers.add(headerName, headerValue);
            }
        }
        
        String fullPath = urls.getUrl(servicePath) + "/" + requestPath;

        String body;
      
        try {  
            StringBuilder bodyBuilder = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                bodyBuilder.append(line);
            }
            body = bodyBuilder.toString();
        } 
        catch (IOException e) {
            body = "";
        }
    
        RequestEntity<?> requestEntity = RequestEntity
            .method(HttpMethod.valueOf(request.getMethod()), URI.create(fullPath))
            .headers(headers)
            .body(body.toString());

        ResponseEntity<?> responseEntity = restTemplate.exchange(requestEntity, Object.class);

        return responseEntity;
    }   

}
