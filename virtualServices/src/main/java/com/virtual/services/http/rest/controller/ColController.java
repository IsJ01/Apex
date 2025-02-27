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

import com.virtual.services.dto.createEdit.ColCreateEditDto;
import com.virtual.services.dto.read.ColReadDto;
import com.virtual.services.service.ColService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/cols")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequiredArgsConstructor
public class ColController {

    private final ColService colService;

    @GetMapping("/")
    public List<ColReadDto> findAll() {
        return colService.findAll();
    }
    
    @GetMapping("/{id}/")
    public ColReadDto findById(@PathVariable Long id) {
        return colService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ColReadDto create(@Validated @RequestBody ColCreateEditDto dto) {
        return colService.create(dto);
    }

    @PutMapping("/{id}/")
    public ColReadDto update(@PathVariable Long id, @Validated @RequestBody ColCreateEditDto dto) {
        return colService.update(id, dto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<?> delete(Long id) {
        return colService.delete(id)
        ?
        noContent().build()
        :
        notFound().build();
    }

}