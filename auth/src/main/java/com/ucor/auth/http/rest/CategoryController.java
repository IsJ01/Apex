package com.ucor.auth.http.rest;

import static org.springframework.http.ResponseEntity.notFound;
import static org.springframework.http.ResponseEntity.ok;

import java.io.UnsupportedEncodingException;
import java.util.concurrent.CompletableFuture;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ucor.auth.database.entity.Role;
import com.ucor.auth.dto.CategoryCreateDto;
import com.ucor.auth.dto.CategoryFilter;
import com.ucor.auth.dto.CategoryReadDto;
import com.ucor.auth.mapper.CategoryReadMapper;
import com.ucor.auth.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryReadMapper categoryReadMapper;

    @Async
    @GetMapping("/api/v1/public/categories")
    public CompletableFuture<PagedModel<CategoryReadDto>> findAllByFilter(
        CategoryFilter categoryFilter,
        @PageableDefault(size = 10, page = 0) Pageable pageable
    ) throws UnsupportedEncodingException {
        Page<CategoryReadDto> page = categoryService.findAllByFilter(categoryFilter, pageable)
            .map(categoryReadMapper::map);
        return CompletableFuture.completedFuture(new PagedModel<>(page));
    }

    @GetMapping("/api/v1/public/categories/by-has-not-users")
    public PagedModel<CategoryReadDto> findAllByHasNotUsers(
        CategoryFilter categoryFilter,
        @PageableDefault(size = 10, page = 0) Pageable pageable
    ) throws UnsupportedEncodingException {
        Page<CategoryReadDto> page = categoryService.findAllByHasNotUsers(categoryFilter, pageable)
            .map(categoryReadMapper::map);
        return new PagedModel<>(page);
    }

    @GetMapping("/api/v1/public/categories/{id}")
    public CategoryReadDto findById(@PathVariable Long id) throws Exception {
        return categoryReadMapper.map(categoryService.findById(id));
    }

    @GetMapping("/api/v1/public/categories/by-name/{name}")
    public CategoryReadDto findByName(@PathVariable String name) throws Exception {
        return categoryReadMapper.map(categoryService.findByName(name));
    }

    @PostMapping("/api/v1/categories")
    public ResponseEntity<?> create(
        @RequestBody CategoryCreateDto createDto, 
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (!userDetails.getAuthorities().contains(new SimpleGrantedAuthority(Role.ADMIN.name()))) {
            ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(201)
            .body(categoryReadMapper.map(categoryService.create(createDto)));
    }

    @DeleteMapping("/api/v1/categories/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        if (!userDetails.getAuthorities().contains(new SimpleGrantedAuthority(Role.ADMIN.name()))) {
            ResponseEntity.status(403).build();
        }
        return categoryService.deleteById(id)
        ?
        ok().build()
        :
        notFound().build();
    }

    @DeleteMapping("/api/v1/categories/by-name/{name}")
    public ResponseEntity<?> deleteByName(@PathVariable String name, @AuthenticationPrincipal UserDetails userDetails) {
        if (!userDetails.getAuthorities().contains(new SimpleGrantedAuthority(Role.ADMIN.name()))) {
            ResponseEntity.status(403).build();
        }
        return categoryService.deleteByName(name)
        ?
        ok().build()
        :
        notFound().build();
    }

}
