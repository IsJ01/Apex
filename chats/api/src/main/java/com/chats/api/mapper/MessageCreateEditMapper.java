package com.chats.api.mapper;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.chats.api.database.entity.Chat;
import com.chats.api.database.entity.Message;
import com.chats.api.database.repository.ChatRepository;
import com.chats.api.dto.MessageCreateEditDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MessageCreateEditMapper implements Mapper<MessageCreateEditDto, Message> {

    private final ChatRepository chatRepository;

    @Override
    public Message map(MessageCreateEditDto dto, Message message) {
        copy(dto, message);
        return message;
    }

    @Override
    public Message map(MessageCreateEditDto object) {
        Message message = new Message();
        copy(object, message);
        return message;
    }

    private void copy(MessageCreateEditDto dto, Message message) {
        message.setText(dto.getText());
        message.setOf(dto.getOf());
        message.setNear(dto.getNear());
        message.setDate(Optional.ofNullable(dto.getDate()).orElse(LocalDate.now()));
        message.setChat(getChat(dto.getChatId()));
    }

    public Chat getChat(Long chatId) {
        return Optional.of(chatId)
            .flatMap(chatRepository::findById)
            .get();
    }

}
