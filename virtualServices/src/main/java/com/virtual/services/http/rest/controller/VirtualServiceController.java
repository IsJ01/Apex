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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.virtual.services.dto.VirtualServiceCreateEditDto;
import com.virtual.services.dto.VirtualServiceReadDto;
import com.virtual.services.service.VirtualServicesService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequestMapping("/api/v1/services")
public class VirtualServiceController {

    private final VirtualServicesService virtualServicesService;

    @GetMapping("/")
    public List<VirtualServiceReadDto> findAll() {
        return virtualServicesService.findAll();
    }

    @GetMapping("/{id}")
    public VirtualServiceReadDto findById(@PathVariable("id") Long id) {
        return virtualServicesService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{name}")
    public VirtualServiceReadDto findByName(@PathVariable("name") String name) {
        return virtualServicesService.findByName(name)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public VirtualServiceReadDto create(@Validated @RequestBody VirtualServiceCreateEditDto dto) {
        return virtualServicesService.create(dto);
    }

    @PutMapping("/path/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public VirtualServiceReadDto update(@PathVariable("id") Long id, 
        @RequestBody VirtualServiceCreateEditDto dto) {
        return virtualServicesService.update(id, dto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        return virtualServicesService.delete(id)
        ? noContent().build()
        : notFound().build();
    }

}
