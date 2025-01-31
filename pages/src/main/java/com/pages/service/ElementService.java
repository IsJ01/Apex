package com.pages.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pages.database.repository.ElementRepository;
import com.pages.dto.ElementCreateEditDto;
import com.pages.dto.ElementReadDto;
import com.pages.mapper.ElementCreateEditMapper;
import com.pages.mapper.ElementReadMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ElementService {

    private final ElementRepository elementRepository;
    private final ElementReadMapper elementReadMapper;
    private final ElementCreateEditMapper elementCreateEditMapper;

    public List<ElementReadDto> findAll() {
        return elementRepository.findAll().stream()
            .map(elementReadMapper::map)
            .toList();
    }

    public Optional<ElementReadDto> findById(Long id) {
        return elementRepository.findById(id)
            .map(elementReadMapper::map);
    }

    @Transactional
    public ElementReadDto create(ElementCreateEditDto elementCreateEditDto) {
        return Optional.of(elementCreateEditDto)
            .map(elementCreateEditMapper::map)
            .map(elementRepository::save)
            .map(elementReadMapper::map)
            .get();
    }

    @Transactional
    public Optional<ElementReadDto> update(Long id, ElementCreateEditDto elementCreateEditDto) {
        return elementRepository.findById(id)
            .map(entity -> elementCreateEditMapper.map(elementCreateEditDto, entity))
            .map(elementRepository::saveAndFlush)
            .map(elementReadMapper::map);
    }

    @Transactional
    public boolean delete(Long id) {
        return elementRepository.findById(id)
            .map(entuty -> {
                elementRepository.delete(entuty);
                return true;
            })
            .orElse(false);
    }

}

