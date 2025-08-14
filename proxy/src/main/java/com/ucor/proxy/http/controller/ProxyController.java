package com.ucor.proxy.http.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ucor.proxy.http.client.ApiClient;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class ProxyController {

    private ApiClient apiClient;

    public ProxyController(ApiClient apiClient) {
        this.apiClient = apiClient;
    }

    @RequestMapping(path={"/", ""})
    public ResponseEntity<?> getPage2(HttpServletRequest request) {
        if (request.getHeader("Api-Request") != null) {
            return send(request);
        }
        return ResponseEntity.ok()
            .contentType(MediaType.TEXT_HTML)
            .body(new ClassPathResource("static/index.html"));
    }
   
    @RequestMapping(value = {"/{path:[^\\.]*}"})
    public String getPage(HttpServletRequest request) {
        return "forward:/index.html";
    }

    private ResponseEntity<?> send(HttpServletRequest request) {
        String path = request.getHeader("Api-Request");

        String apiPath = path.substring(5);
        String[] paths = apiPath.split("/", 2);

        if (paths.length == 2) {
            return apiClient.send(request, paths[0], paths[1]);
        }

        return apiClient.send(request, paths[0], "");
    }
    
}
