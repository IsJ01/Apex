package com.virtual.services.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtual.services.db.repository.RowRepository;
import com.virtual.services.dto.RowCreateEditDto;
import com.virtual.services.dto.RowReadDto;
import com.virtual.services.mapper.RowCreateEditMapper;
import com.virtual.services.mapper.RowReadMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RowService {

    private final RowRepository rowRepository;
    private final RowReadMapper rowReadMapper;
    private final RowCreateEditMapper rowCreateEditMapper;

    public List<RowReadDto> findAll() {
        return rowRepository.findAll().stream()
            .map(rowReadMapper::map)
            .toList();
    }

    public List<RowReadDto> findAllByServiceId(Long id) {
        return rowRepository.findAllByServiceId(id).stream()
            .map(rowReadMapper::map)
            .toList();
    }

    public Optional<RowReadDto> findById(Long id) {
        return rowRepository.findById(id)
            .map(rowReadMapper::map);
    }

    public Optional<RowReadDto> findByName(String name) {
        return rowRepository.findByName(name)
            .map(rowReadMapper::map);
    }

    @Transactional
    public RowReadDto create(RowCreateEditDto dto) {
        return Optional.of(dto)
            .map(rowCreateEditMapper::map)
            .map(rowRepository::save)
            .map(rowReadMapper::map)
            .orElseThrow();
    }

    @Transactional
    public Optional<RowReadDto> update(Long id, RowCreateEditDto dto) {
        return rowRepository.findById(id)
            .map(entity -> {
                return rowCreateEditMapper.map(dto, entity);
            })
            .map(rowRepository::save)
            .map(rowReadMapper::map);
    }

    @Transactional
    public Optional<RowReadDto> updateByName(String name, RowCreateEditDto dto) {
        return rowRepository.findByName(name)
            .map(entity -> {
                return rowCreateEditMapper.map(dto, entity);
            })
            .map(rowRepository::save)
            .map(rowReadMapper::map);
    }

    @Transactional
    public boolean delete(Long id) {
        return rowRepository.findById(id)
            .map(entity -> {
                rowRepository.delete(entity);
                return true;
            })
            .orElse(false);
    }

}
