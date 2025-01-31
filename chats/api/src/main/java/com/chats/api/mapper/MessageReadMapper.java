package com.chats.api.mapper;

import org.springframework.stereotype.Component;

import com.chats.api.database.entity.Message;
import com.chats.api.dto.MessageReadDto;

@Component
public class MessageReadMapper implements Mapper<Message, MessageReadDto> {

    @Override
    public MessageReadDto map(Message object) {
        return new MessageReadDto(
            object.getId(),
            object.getOf(),
            object.getNear(),
            object.getText(),
            object.getDate()
        );
    }

}
