package com.ucor.proxy.http.client;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Urls {

    @Value("${mode}")
    private String mode;

    private Map<String, String> URLS = new HashMap<>() {{
        put("auth", "http://localhost:8001");
    }};

    private Map<String, String> DOCKER_URLS = new HashMap<>() {{
        put("auth", "http://auth:8001");
    }};

    public String getUrl(String path) {
        if (mode.equals("dev")) {
            return URLS.get(path);
        } 
        return DOCKER_URLS.get(path);
    }

}
