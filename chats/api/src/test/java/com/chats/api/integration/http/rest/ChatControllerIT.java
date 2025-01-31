package com.chats.api.integration.http.rest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static  org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.chats.api.integration.IntegrationTestBase;

@AutoConfigureMockMvc
public class ChatControllerIT extends IntegrationTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testFindAll() throws Exception {
        mockMvc.perform(get("/api/v1/chats/"))
            .andExpect(status().is2xxSuccessful());
    }

    @Test
    public void testFindById() throws Exception {
        mockMvc.perform(get("/api/v1/chats/3/"))
            .andExpect(status().is2xxSuccessful())
            .andExpect(content().json("{'user1':2,'user2':3,'messages':[]}"));
    }

    @Test
    public void testCreate() throws Exception {
        mockMvc.perform(post("/api/v1/chats/")
            .param("user1", "1")
            .param("user2", "3"))
            .andExpect(status().is2xxSuccessful());
    }

    @Test
    public void testUpdate() throws Exception {
        mockMvc.perform(put("/api/v1/chats/2/")
            .param("user1", "1")
            .param("user2", "3"))
            .andExpect(status().is2xxSuccessful());
    }

    @Test
    public void testDelete() throws Exception {
        mockMvc.perform(delete("/api/v1/chats/3/"))
            .andExpect(status().is2xxSuccessful());
    }

}
