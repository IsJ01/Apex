package com.chats.api.dto;

import java.time.LocalDate;

import lombok.Value;

@Value
public class MessageReadDto {
    Long id;
    Integer of;
    Integer near;
    String text;
    LocalDate date;
}
