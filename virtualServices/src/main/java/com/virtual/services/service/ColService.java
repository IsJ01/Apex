package com.virtual.services.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtual.services.db.repository.ColRepository;
import com.virtual.services.dto.createEdit.ColCreateEditDto;
import com.virtual.services.dto.read.ColReadDto;
import com.virtual.services.mapper.create.ColCreateEditMapper;
import com.virtual.services.mapper.read.ColReadMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ColService {
    
    private final ColRepository colRepository;
    private final ColReadMapper colReadMapper;
    private final ColCreateEditMapper colCreateEditMapper;

    public List<ColReadDto> findAll() {
        return colRepository.findAll().stream()
            .map(colReadMapper::map)
            .toList();
    }

    public Optional<ColReadDto> findById(Long id) {
        return colRepository.findById(id)
            .map(colReadMapper::map);
    }

    @Transactional
    public ColReadDto create(ColCreateEditDto dto) {
        return Optional.of(dto)
            .map(colCreateEditMapper::map)
            .map(colRepository::save)
            .map(colReadMapper::map)
            .get();
    }

    @Transactional
    public Optional<ColReadDto> update(Long id, ColCreateEditDto dto) {
        return colRepository.findById(id)
            .map(entity -> colCreateEditMapper.map(dto, entity))
            .map(colRepository::saveAndFlush)
            .map(colReadMapper::map);
    }

    @Transactional
    public boolean delete(Long id) {
        return colRepository.findById(id)
            .map(entity -> {
                colRepository.delete(entity);
                return true;
            })
            .orElse(false);
    }
}
