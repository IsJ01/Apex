package com.chats.api.dto;

import java.util.List;

import lombok.Value;

@Value
public class ChatReadDto {
    Long id;
    Integer user1;
    Integer user2;
    List<MessageReadDto> messages;
}
