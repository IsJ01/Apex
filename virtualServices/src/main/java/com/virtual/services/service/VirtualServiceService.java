package com.virtual.services.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtual.services.db.repository.VirtualServiceRepository;
import com.virtual.services.dto.createEdit.VirtualServiceCreateEditDto;
import com.virtual.services.dto.read.VirtualServiceReadDto;
import com.virtual.services.mapper.create.VirtualServiceCreateEditMapper;
import com.virtual.services.mapper.read.VirtualServiceReadMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VirtualServiceService {
    
    private final VirtualServiceRepository virtualServiceRepository;
    private final VirtualServiceReadMapper virtualServiceReadMapper;
    private final VirtualServiceCreateEditMapper virtualServiceCreateEditMapper;

    public List<VirtualServiceReadDto> findAll() {
        return virtualServiceRepository.findAll().stream()
            .map(virtualServiceReadMapper::map)
            .toList();
    }

    public Optional<VirtualServiceReadDto> findById(Long id) {
        return virtualServiceRepository.findById(id)
            .map(virtualServiceReadMapper::map);
    }

    public Optional<VirtualServiceReadDto> findByName(String name) {
        return virtualServiceRepository.findByName(name)
            .map(virtualServiceReadMapper::map);
    }


    @Transactional
    public VirtualServiceReadDto create(VirtualServiceCreateEditDto dto) {
        return Optional.of(dto)
            .map(virtualServiceCreateEditMapper::map)
            .map(virtualServiceRepository::save)
            .map(virtualServiceReadMapper::map)
            .get();
    }

    @Transactional
    public Optional<VirtualServiceReadDto> update(Long id, VirtualServiceCreateEditDto dto) {
        return virtualServiceRepository.findById(id)
            .map(entity -> virtualServiceCreateEditMapper.map(dto, entity))
            .map(virtualServiceRepository::saveAndFlush)
            .map(virtualServiceReadMapper::map);
    }

    @Transactional
    public boolean delete(Long id) {
        return virtualServiceRepository.findById(id)
            .map(entity -> {
                virtualServiceRepository.delete(entity);
                return true;
            })
            .orElse(false);
    }
}