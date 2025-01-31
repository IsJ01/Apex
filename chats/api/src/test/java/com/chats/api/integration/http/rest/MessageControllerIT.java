package com.chats.api.integration.http.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import com.chats.api.integration.IntegrationTestBase;

@AutoConfigureMockMvc
public class MessageControllerIT extends IntegrationTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testFindAll() throws Exception {
        mockMvc.perform(get("/api/v1/messages/"))
            .andExpect(status().is2xxSuccessful());
    }

    @Test
    public void testFindById() throws Exception {
        mockMvc.perform(get("/api/v1/messages/1/"))
            .andExpect(status().is2xxSuccessful());
    }

    @Test
    public void testCreate() throws Exception {
        mockMvc.perform(post("/api/v1/messages/")
            .param("of", "1")
            .param("near", "2")
            .param("text", "Bye!")
            .param("chatId", "1"))
            .andExpect(status().is2xxSuccessful());
    }

    @Test
    public void testUpdate() throws Exception {
        mockMvc.perform(put("/api/v1/messages/1/")
            .param("of", "1")
            .param("near", "2")
            .param("text", "Hello!!")
            .param("chatId", "1"))
            .andExpect(status().is2xxSuccessful());
    }

    @Test 
    public void testDelete() throws Exception {
        mockMvc.perform(delete("/api/v1/messages/2/"))
            .andExpect(status().is2xxSuccessful());
    }

}
