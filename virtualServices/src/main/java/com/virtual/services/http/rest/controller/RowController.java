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

import com.virtual.services.dto.createEdit.RowCreateEditDto;
import com.virtual.services.dto.read.RowReadDto;
import com.virtual.services.service.RowService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/rows")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequiredArgsConstructor
public class RowController {

    private final RowService rowService;

    @GetMapping("/")
    public List<RowReadDto> findAll() {
        return rowService.findAll();
    }
    
    @GetMapping("/{id}/")
    public RowReadDto findById(@PathVariable Long id) {
        return rowService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public RowReadDto create(@Validated @RequestBody RowCreateEditDto dto) {
        return rowService.create(dto);
    }

    @PutMapping("/{id}/")
    public RowReadDto update(@PathVariable Long id, @Validated @RequestBody RowCreateEditDto dto) {
        return rowService.update(id, dto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<?> delete(Long id) {
        return rowService.delete(id)
        ?
        noContent().build()
        :
        notFound().build();
    }

}