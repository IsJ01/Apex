package com.pages.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pages.database.repository.PropertyRepository;
import com.pages.dto.PropertyCreateEditDto;
import com.pages.dto.PropertyReadDto;
import com.pages.mapper.PropertyCreateEditMapper;
import com.pages.mapper.PropertyReadMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final PropertyReadMapper propertyReadMapper;
    private final PropertyCreateEditMapper propertyCreateEditMapper;

    public List<PropertyReadDto> findAll() {
        return propertyRepository.findAll().stream()
            .map(propertyReadMapper::map)
            .toList();
    }

    public Optional<PropertyReadDto> findById(Long id) {
        return propertyRepository.findById(id)
            .map(propertyReadMapper::map);
    }

    @Transactional
    public PropertyReadDto create(PropertyCreateEditDto dto) {
        return Optional.of(dto)
            .map(propertyCreateEditMapper::map)
            .map(propertyRepository::save)
            .map(propertyReadMapper::map)
            .get();
    }

    @Transactional
    public Optional<PropertyReadDto> update(Long id, PropertyCreateEditDto dto) {
        return propertyRepository.findById(id)
            .map(entity -> propertyCreateEditMapper.map(dto, entity))
            .map(propertyRepository::saveAndFlush)
            .map(propertyReadMapper::map);
    }

    @Transactional
    public boolean delete(Long id) {
        return propertyRepository.findById(id)
            .map(entity -> {
                propertyRepository.delete(entity);
                return true;
            })
            .orElse(false);
    }

}
