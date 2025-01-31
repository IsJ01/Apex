package com.chats.api.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

@Value
public class MessageCreateEditDto {

    @NotNull
    Integer of;

    @NotNull
    Integer near;
    
    @Size(max = 1000)
    String text;

    LocalDate date;

    Long chatId;
}
