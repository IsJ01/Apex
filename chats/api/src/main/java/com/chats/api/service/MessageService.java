package com.chats.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chats.api.database.repository.MessageRepository;
import com.chats.api.dto.MessageCreateEditDto;
import com.chats.api.dto.MessageReadDto;
import com.chats.api.mapper.MessageCreateEditMapper;
import com.chats.api.mapper.MessageReadMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MessageService {

    private final MessageRepository messageRepository;
    private final MessageReadMapper messageReadMapper;
    private final MessageCreateEditMapper messageCreateEditMapper;

    public List<MessageReadDto> findAll() {
        return messageRepository.findAll().stream()
            .map(messageReadMapper::map)
            .toList();
    }

    public Optional<MessageReadDto> findById(Long id) {
        return messageRepository.findById(id)
            .map(messageReadMapper::map);
    }

    @Transactional
    public MessageReadDto create(MessageCreateEditDto dto) {
        return Optional.of(dto)
            .map(messageCreateEditMapper::map)
            .map(messageRepository::save)
            .map(messageReadMapper::map)
            .orElseThrow();
    }

    @Transactional
    public Optional<MessageReadDto> update(Long id, MessageCreateEditDto dto) {
        return messageRepository.findById(id)
            .map(entity -> messageCreateEditMapper.map(dto, entity))
            .map(messageRepository::save)
            .map(messageReadMapper::map);
    }

    @Transactional
    public boolean delete(Long id) {
        return messageRepository.findById(id)
            .map(entity -> {
                messageRepository.delete(entity);
                return true;
            })
            .orElse(false);
    }
    
}
