package com.chats.api.mapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.chats.api.database.entity.Chat;
import com.chats.api.database.entity.Message;
import com.chats.api.database.repository.MessageRepository;
import com.chats.api.dto.ChatCreateEditDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ChatCreateEditMapper implements Mapper<ChatCreateEditDto, Chat> {

    private final MessageRepository messageRepository;

    @Override
    public Chat map(ChatCreateEditDto object, Chat chat) {
        copy(object, chat);
        return chat;
    }

    @Override
    public Chat map(ChatCreateEditDto object) {
        Chat chat = new Chat();
        copy(object, chat);
        return chat;
    }

    private void copy(ChatCreateEditDto dto, Chat chat) {
        chat.setUser1(dto.getUser1());
        chat.setUser2(dto.getUser2());
        chat.setMessages(getMessages(dto.getMessages()));
    }

    private List<Message> getMessages(List<Long> messages) {
        return new ArrayList<>(Optional.ofNullable(messages)
            .orElse(Collections.emptyList())
            .stream()
            .map(message -> messageRepository.findById(message).get())
            .toList());
    }

}
