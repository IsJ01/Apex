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

import com.pages.dto.PropertyCreateEditDto;
import com.pages.dto.PropertyReadDto;
import com.pages.service.PropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/properties")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping("/")
    public List<PropertyReadDto> findAll() {
        return propertyService.findAll();
    }

    @GetMapping("/{id}/")
    public PropertyReadDto findById(@PathVariable Long id) {
        return propertyService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public PropertyReadDto create(@Validated @RequestBody PropertyCreateEditDto dto) {
        return propertyService.create(dto);
    }

    @PutMapping("/{id}/")
    public PropertyReadDto update(@PathVariable Long id, @Validated @RequestBody PropertyCreateEditDto dto) {
        return propertyService.update(id, dto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return propertyService.delete(id)
        ? noContent().build()
        : notFound().build();
    }

}
