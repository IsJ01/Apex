package com.chats.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chats.api.database.repository.ChatRepository;
import com.chats.api.dto.ChatCreateEditDto;
import com.chats.api.dto.ChatReadDto;
import com.chats.api.mapper.ChatCreateEditMapper;
import com.chats.api.mapper.ChatReadMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatService {
    
    private final ChatRepository chatRepository;
    private final ChatReadMapper chatReadMapper;
    private final ChatCreateEditMapper chatCreateEditMapper;

    public List<ChatReadDto> findAll() {
        return chatRepository.findAll().stream()
            .map(chatReadMapper::map)
            .toList();
    }

    public Optional<ChatReadDto> findById(Long id) {
        return chatRepository.findById(id)
            .map(chatReadMapper::map);
    }

    @Transactional
    public ChatReadDto create(ChatCreateEditDto dto) {
        return Optional.of(dto)
            .map(chatCreateEditMapper::map)
            .map(chatRepository::save)
            .map(chatReadMapper::map)
            .orElseThrow();
    } 

    @Transactional
    public Optional<ChatReadDto> update(Long id, ChatCreateEditDto dto) {
        return chatRepository.findById(id)
            .map(entity -> chatCreateEditMapper.map(dto, entity))
            .map(chatRepository::saveAndFlush)
            .map(chatReadMapper::map);
    }

    @Transactional
    public boolean delete(Long id) {
        return chatRepository.findById(id)
            .map(entity -> {
                chatRepository.delete(entity);
                return true;
            })
            .orElse(false);
    }

}
