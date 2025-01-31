package com.pages.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pages.database.repository.PageRepository;
import com.pages.dto.PageCreateEditDto;
import com.pages.dto.PageReadDto;
import com.pages.mapper.PageCreateEditMapper;
import com.pages.mapper.PageReadMapper;
import com.pages.mapper.PageTreeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PageService {

    private final PageRepository pageRepository;
    private final PageReadMapper pageReadMapper;
    private final PageCreateEditMapper pageCreateEditMapper;
    private final PageTreeMapper pageTreeMapper;

    public List<PageReadDto> findAll() {
        return pageRepository.findAll().stream()
            .map(pageReadMapper::map)
            .toList();
    }

    public List<PageReadDto> findAllTree() {
        return pageRepository.findAll().stream()
            .map(pageTreeMapper::map)
            .toList();
    }

    public Optional<PageReadDto> findByUri(String uri) {
        return pageRepository.findByUri(uri)
            .map(pageReadMapper::map);
    }

    public Optional<PageReadDto> findById(Long id) {
        return pageRepository.findById(id)
            .map(pageReadMapper::map);
    }

    public Optional<PageReadDto> findByIdTree(Long id) {
        return pageRepository.findById(id)
            .map(pageTreeMapper::map);
    }

    @Transactional
    public PageReadDto create(PageCreateEditDto pageCreateEditDto) {
        return Optional.of(pageCreateEditDto)
            .map(pageCreateEditMapper::map)
            .map(pageRepository::save)
            .map(pageReadMapper::map)
            .get();
    }

    @Transactional
    public Optional<PageReadDto> update(Long id, PageCreateEditDto pageCreateEditDto) {
        return pageRepository.findById(id)
            .map(entity -> pageCreateEditMapper.map(pageCreateEditDto, entity))
            .map(pageRepository::saveAndFlush)
            .map(pageReadMapper::map);
    }

    @Transactional
    public boolean deleteByUri(String uri) {
        return pageRepository.findByUri(uri)
            .map(entity -> {
                pageRepository.delete(entity);
                return true;
            })
            .orElse(false);
    }

    @Transactional
    public boolean delete(Long id) {
        return pageRepository.findById(id)
            .map(entity -> {
                pageRepository.delete(entity);
                return true;
            })
            .orElse(false);
    }

}
