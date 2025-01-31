package com.virtual.services.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtual.services.db.repository.FieldRepository;
import com.virtual.services.dto.FieldCreateEditDto;
import com.virtual.services.dto.FieldReadDto;
import com.virtual.services.mapper.FieldCreateEditMapper;
import com.virtual.services.mapper.FieldReadMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FieldService {

    private final FieldRepository fieldRepository;
    private final FieldReadMapper fieldReadMapper;
    private final FieldCreateEditMapper fieldCreateEditMapper;

    public List<FieldReadDto> findAll() {
        return fieldRepository.findAll().stream()
            .map(fieldReadMapper::map)
            .toList();
    }

    public List<FieldReadDto> findAllByRowId(Long id) {
        return fieldRepository.findAllByRowId(id).stream()
            .map(fieldReadMapper::map)
            .toList();
    }

    public Optional<FieldReadDto> findById(Long id) {
        return fieldRepository.findById(id)
            .map(fieldReadMapper::map);
    }

    public Optional<FieldReadDto> findByName(String name) {
        return fieldRepository.findByName(name)
            .map(fieldReadMapper::map);
    }

    @Transactional
    public FieldReadDto create(FieldCreateEditDto dto) {
        return Optional.of(dto)
            .map(fieldCreateEditMapper::map)
            .map(fieldRepository::save)
            .map(fieldReadMapper::map)
            .orElseThrow();
    }

    @Transactional
    public Optional<FieldReadDto> update(Long id, FieldCreateEditDto dto) {
        return fieldRepository.findById(id)
            .map(entity -> {
                return fieldCreateEditMapper.map(dto, entity);
            })
            .map(fieldRepository::saveAndFlush)
            .map(fieldReadMapper::map);
    }

    @Transactional
    public Optional<FieldReadDto> updateByName(String name, FieldCreateEditDto dto) {
        return fieldRepository.findByName(name)
            .map(entity -> {
                return fieldCreateEditMapper.map(dto, entity);
            })
            .map(fieldRepository::saveAndFlush)
            .map(fieldReadMapper::map);
    }

    @Transactional 
    public boolean delete(Long id) {
        return fieldRepository.findById(id)
            .map(entity -> {
                fieldRepository.delete(entity);
                return true;
            })
            .orElse(false);
    }

}
