package com.pages.http.rest.controller;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.notFound;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

import com.pages.dto.PageCreateEditDto;
import com.pages.dto.PageReadDto;
import com.pages.service.PageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pages")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class PageController {

    private final PageService pageService;

    @GetMapping("/exist/{uri}/")
    public boolean isExist(@PathVariable String uri) {
        return pageService.findByUri(uri)
            .map(obj -> true)
            .orElse(false);
    }

    @GetMapping("/")
    public List<PageReadDto> findAll() {
        return pageService.findAll();
    }

    @GetMapping("/tree/")
    public List<PageReadDto> findAllTree() {
        return pageService.findAllTree();
    }

    @GetMapping("/{id}/")
    public PageReadDto findById(@PathVariable Long id) {
        return pageService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{id}/tree/")
    public PageReadDto findByIdTree(@PathVariable Long id) {
        return pageService.findByIdTree(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping(value = "/", consumes = {MediaType.APPLICATION_JSON_VALUE}, 
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public PageReadDto create(@Validated @RequestBody PageCreateEditDto dto) {
        return pageService.create(dto);
    }

    @PutMapping("/{id}/")
    public PageReadDto update(@PathVariable Long id, @Validated @RequestBody PageCreateEditDto dto) {
        return pageService.update(id, dto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/byUri/{uri}/")
    public ResponseEntity<?> deleteByUri(@PathVariable String uri) {
        return pageService.deleteByUri(uri)
        ? noContent().build()
        : notFound().build();
    }


    @DeleteMapping("/{id}/")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return pageService.delete(id)
        ? noContent().build()
        : notFound().build();
    }

}
