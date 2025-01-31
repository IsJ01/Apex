package com.virtual.services.http.rest.controller;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.notFound;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.virtual.services.dto.FieldCreateEditDto;
import com.virtual.services.dto.FieldReadDto;
import com.virtual.services.service.FieldService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequiredArgsConstructor
@RequestMapping("/api/v1/fields")
public class FieldController {

    private final FieldService fieldService;

    @GetMapping("/")
    public List<FieldReadDto> findAll() {
        return fieldService.findAll();
    }

    @GetMapping("/rows/{id}")
    public List<FieldReadDto> findAllByRowId(@PathVariable("id") Long rowId) {
        return fieldService.findAllByRowId(rowId);
    }

    @GetMapping("/{id}")
    public FieldReadDto findById(@PathVariable("id") Long id) {
        return fieldService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{name}")
    public FieldReadDto findByName(@PathVariable("name") String name) {
        return fieldService.findByName(name)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public FieldReadDto create(@Validated @RequestBody FieldCreateEditDto dto) {
        return fieldService.create(dto);
    }

    @PutMapping("/{id}")
    public FieldReadDto update(@PathVariable("id") Long id, 
        @Validated @RequestBody FieldCreateEditDto dto) {
        return fieldService.update(id, dto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{name}")
    public FieldReadDto updateByName(@PathVariable("name") String name, 
        @Validated @RequestBody FieldCreateEditDto dto) {
        return fieldService.updateByName(name, dto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        return fieldService.delete(id)
        ? noContent().build()
        : notFound().build();
    }

}
