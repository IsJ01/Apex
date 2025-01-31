package com.chats.api.integration.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.chats.api.dto.MessageCreateEditDto;
import com.chats.api.integration.IntegrationTestBase;
import com.chats.api.service.MessageService;

public class MessageServiceIT extends IntegrationTestBase {

    @Autowired
    private MessageService messageService;

    @Test
    public void testFindAll() {
        var result = messageService.findAll();
        assertTrue(!result.isEmpty());
    }

    @Test
    public void testFindById() {
        assertEquals(messageService.findById(1L).get().getText(), "Hie!");
    }

    @Test
    public void testCreate() {
        MessageCreateEditDto dto = new MessageCreateEditDto(0, 1, "Bye", LocalDate.now(), 1L);
        var result = messageService.create(dto);
        assertTrue(messageService.findById(result.getId()).isPresent());
    }

    @Test
    public void testUpdate() {
        MessageCreateEditDto dto = new MessageCreateEditDto(0, 1, "Hello!", LocalDate.now(), 1L);
        var result = messageService.update(1L, dto);
        assertTrue(result.isPresent());
        assertEquals(messageService.findById(1L).get().getText(), "Hello!");
    }

    @Test
    public void testDelete() {
        assertTrue(messageService.delete(2L));
    }
}
