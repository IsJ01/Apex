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

import com.virtual.services.dto.createEdit.VirtualServiceCreateEditDto;
import com.virtual.services.dto.read.VirtualServiceReadDto;
import com.virtual.services.service.VirtualServiceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/virtualServices")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequiredArgsConstructor
public class VirtualServiceController {

    private final VirtualServiceService virtualServiceService;

    @GetMapping("/")
    public List<VirtualServiceReadDto> findAll() {
        return virtualServiceService.findAll();
    }
    
    @GetMapping("/{id}/")
    public VirtualServiceReadDto findById(@PathVariable Long id) {
        return virtualServiceService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/service/{name}/")
    public VirtualServiceReadDto findById(@PathVariable String name) {
        return virtualServiceService.findByName(name)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public VirtualServiceReadDto create(@Validated @RequestBody VirtualServiceCreateEditDto dto) {
        return virtualServiceService.create(dto);
    }

    @PutMapping("/{id}/")
    public VirtualServiceReadDto update(@PathVariable Long id, @Validated @RequestBody VirtualServiceCreateEditDto dto) {
        return virtualServiceService.update(id, dto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return virtualServiceService.delete(id)
        ?
        noContent().build()
        :
        notFound().build();
    }

}