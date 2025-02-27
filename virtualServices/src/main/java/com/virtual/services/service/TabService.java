package com.virtual.services.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtual.services.db.repository.TabRepository;
import com.virtual.services.dto.createEdit.TabCreateEditDto;
import com.virtual.services.dto.read.TabReadDto;
import com.virtual.services.mapper.create.TabCreateEditMapper;
import com.virtual.services.mapper.read.TabReadMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TabService {
    
    private final TabRepository tabRepository;
    private final TabReadMapper tabReadMapper;
    private final TabCreateEditMapper tabCreateEditMapper;

    public List<TabReadDto> findAll() {
        return tabRepository.findAll().stream()
            .map(tabReadMapper::map)
            .toList();
    }

    public Optional<TabReadDto> findById(Long id) {
        return tabRepository.findById(id)
            .map(tabReadMapper::map);
    }

    @Transactional
    public TabReadDto create(TabCreateEditDto dto) {
        return Optional.of(dto)
            .map(tabCreateEditMapper::map)
            .map(tabRepository::save)
            .map(tabReadMapper::map)
            .get();
    }

    @Transactional
    public Optional<TabReadDto> update(Long id, TabCreateEditDto dto) {
        return tabRepository.findById(id)
            .map(entity -> tabCreateEditMapper.map(dto, entity))
            .map(tabRepository::saveAndFlush)
            .map(tabReadMapper::map);
    }

    @Transactional
    public boolean delete(Long id) {
        return tabRepository.findById(id)
            .map(entity -> {
                tabRepository.delete(entity);
                return true;
            })
            .orElse(false);
    }
}
