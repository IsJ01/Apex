package com.chats.api.integration.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.chats.api.dto.ChatCreateEditDto;
import com.chats.api.integration.IntegrationTestBase;
import com.chats.api.service.ChatService;

public class ChatServiceIT extends IntegrationTestBase {

    @Autowired
    private ChatService chatService;

    @Test
    public void testFindAll() {
        var results = chatService.findAll();
        assertEquals(results.size(), 2);
    }

    @Test
    public void testFindById() {
        var chat = chatService.findById(1L);
        assertTrue(chat.isPresent());
        assertEquals(chat.get().getMessages().size(), 3);
    }

    @Test
    public void testCreate() {
        ChatCreateEditDto chatDto = new ChatCreateEditDto(0, 2, null);
        var result = chatService.create(chatDto);
        assertNotNull(result);
    }

    @Test
    public void testUpdate() {
        ChatCreateEditDto chatDto = new ChatCreateEditDto(0, 2, null);
        chatService.create(chatDto);
        ChatCreateEditDto chatDto2 = new ChatCreateEditDto(2, 0, null);
        var result = chatService.update(4L, chatDto2);
        assertTrue(result.isPresent());
    }
    
    @Test
    public void testDelete() {
        System.out.println(chatService.findAll());
        assertTrue(chatService.delete(3L));
    }

}
