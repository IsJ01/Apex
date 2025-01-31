package com.tasks.api.http.connection;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class UsersUrlConnection {

    public static boolean is_current(String sessionid, Integer id) throws Exception {
        HttpClient httpClient = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("http://localhost:8001/current/"))
            .header("sessionid", sessionid)
            .GET()
            .build();
        HttpResponse<?> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        try {
            JSONObject jsonParser = new JSONObject(response.body().toString());
            if (jsonParser.get("id") == id) {
                return true;
            } 
            return false;
        }
        catch (Exception e) {
            log.error("Invalid data");
            return false;
        }
    }

}
