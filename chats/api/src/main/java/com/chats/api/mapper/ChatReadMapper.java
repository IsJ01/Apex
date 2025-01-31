package com.chats.api.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.chats.api.database.entity.Chat;
import com.chats.api.dto.ChatReadDto;
import com.chats.api.dto.MessageReadDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ChatReadMapper implements Mapper<Chat, ChatReadDto> {

    private final MessageReadMapper messageReadMapper;

    @Override
    public ChatReadDto map(Chat object) {
        List<MessageReadDto> messages = object.getMessages().stream()
            .map(entity -> messageReadMapper.map(entity))
            .toList();
        return new ChatReadDto(
            object.getId(), 
            object.getUser1(), 
            object.getUser2(), 
            messages);
    }

}
