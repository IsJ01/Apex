package com.chats.api.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class ChatCreateEditDto {
    
    @NotNull
    Integer user1;

    @NotNull
    Integer user2;

    List<Long> messages;
}
