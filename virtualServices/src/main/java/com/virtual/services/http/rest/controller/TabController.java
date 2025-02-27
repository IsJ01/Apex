package com.virtual.services.http.rest.controller;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.notFound;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.virtual.services.dto.createEdit.TabCreateEditDto;
import com.virtual.services.dto.read.TabReadDto;
import com.virtual.services.service.TabService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/tabs")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequiredArgsConstructor
public class TabController {

    private final TabService tabService;

    @GetMapping("/")
    public List<TabReadDto> findAll() {
        return tabService.findAll();
    }
    
    @GetMapping("/{id}/")
    public TabReadDto findById(@PathVariable Long id) {
        return tabService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public TabReadDto create(@Validated @RequestBody TabCreateEditDto dto) {
        return tabService.create(dto);
    }

    @PutMapping("/{id}/")
    public TabReadDto update(@PathVariable Long id, @Validated @RequestBody TabCreateEditDto dto) {
        return tabService.update(id, dto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<?> delete(Long id) {
        return tabService.delete(id)
        ?
        noContent().build()
        :
        notFound().build();
    }

}