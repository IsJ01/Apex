package com.pages.http.rest.controller;

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

import com.pages.dto.ElementCreateEditDto;
import com.pages.dto.ElementReadDto;
import com.pages.service.ElementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/elements")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class ElementController {

    private final ElementService elementService;

    @GetMapping("/")
    public List<ElementReadDto> findAll() {
        return elementService.findAll();
    }

    @GetMapping("/{id}/")
    public ElementReadDto findById(@PathVariable Long id) {
        return elementService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ElementReadDto create(@Validated @RequestBody ElementCreateEditDto dto) {
        return elementService.create(dto);
    }

    @PutMapping("/{id}/")
    public ElementReadDto update(@PathVariable Long id, @Validated @RequestBody ElementCreateEditDto dto) {
        return elementService.update(id, dto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return elementService.delete(id)
        ? noContent().build()
        : notFound().build();
    }

}
