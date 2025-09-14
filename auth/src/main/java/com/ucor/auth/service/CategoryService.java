package com.ucor.auth.service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ucor.auth.database.entity.Category;
import com.ucor.auth.database.entity.User;
import com.ucor.auth.database.repository.CategoryRepository;
import com.ucor.auth.dto.CategoryCreateDto;
import com.ucor.auth.dto.CategoryFilter;
import com.ucor.auth.mapper.CategoryCreateMapper;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CategoryService {

    private final CategoryCreateMapper categoryCreateMapper;
    private final CategoryRepository categoryRepository;

    @Cacheable("categories-list-cache")
    @SuppressWarnings("null")
    public Page<Category> findAllByFilter(CategoryFilter filter, Pageable pageable) throws UnsupportedEncodingException {
        CategoryFilter decodeFilter;
        List<String> decodeUsers = new ArrayList<>();

        if (filter.getName() != null) {
            if (filter.getUsers() != null) {
                for (String username: filter.getUsers()) {
                    decodeUsers.add(URLDecoder.decode(username, "UTF-8"));
                }
            }
            decodeFilter = new CategoryFilter(
                URLDecoder.decode(filter.getName(), "UTF-8"),
                decodeUsers
            );
        }
        else if (filter.getUsers() != null) {
            for (String username: filter.getUsers()) {
                decodeUsers.add(URLDecoder.decode(username, "UTF-8"));
            }
            decodeFilter = new CategoryFilter(
                null,
                decodeUsers
            );
        }    
        else {
            decodeFilter = new CategoryFilter(null, null);
        }

        List<Specification<Category>> spec = new ArrayList<>();

        if (decodeFilter.getName() != null) {
            spec.add((root, query, cb) -> cb.like(root.get("name"), "%" + decodeFilter.getName() + "%"));
        }

        if (decodeFilter.getUsers() != null) {
            for (String username: decodeFilter.getUsers()) {
                spec.add((root, query, cb) -> {
                    Subquery<User> subquery = query.subquery(User.class);
                    Root<Category> subRoot = subquery.correlate(root);

                    Join<Category, User> userJoin = subRoot.join("users");

                    subquery.select(userJoin)
                        .where(cb.equal(userJoin.get("username"), username));
                    return cb.exists(subquery);
                });
            }
        }

        return categoryRepository.findAll(Specification.allOf(spec), pageable);
    }

    @SuppressWarnings("null")
    public Page<Category> findAllByHasNotUsers(CategoryFilter filter, Pageable pageable) throws UnsupportedEncodingException {
        CategoryFilter decodeFilter;
        List<String> decodeUsers = new ArrayList<>();

        if (filter.getName() != null) {
            if (filter.getUsers() != null) {
                for (String username: filter.getUsers()) {
                    decodeUsers.add(URLDecoder.decode(username, "UTF-8"));
                }
            }
            decodeFilter = new CategoryFilter(
                URLDecoder.decode(filter.getName(), "UTF-8"),
                decodeUsers
            );
        }
        else if (filter.getUsers() != null) {
            for (String username: filter.getUsers()) {
                decodeUsers.add(URLDecoder.decode(username, "UTF-8"));
            }
            decodeFilter = new CategoryFilter(
                null,
                decodeUsers
            );
        }    
        else {
            decodeFilter = new CategoryFilter(null, null);
        }

        List<Specification<Category>> spec = new ArrayList<>();

        if (decodeFilter.getName() != null) {
            spec.add((root, query, cb) -> cb.like(root.get("name"), "%" + decodeFilter.getName() + "%"));
        }

        if (decodeFilter.getUsers() != null) {
            for (String username: decodeFilter.getUsers()) {
                spec.add((root, query, cb) -> {
                    Subquery<User> subquery = query.subquery(User.class);
                    Root<Category> subRoot = subquery.correlate(root);

                    Join<Category, User> userJoin = subRoot.join("users");

                    subquery.select(userJoin)
                        .where(cb.equal(userJoin.get("username"), username));
                    return cb.not(cb.exists(subquery));
                });
            }
        }

        return categoryRepository.findAll(Specification.allOf(spec), pageable);
    }
    
    public Category findById(Long id) throws Exception {
        return categoryRepository.findById(id)
            .orElseThrow(() -> new Exception("Not found by Id: " + String.valueOf(id)));
    }

    public Category findByName(String name) throws Exception {
        return categoryRepository.findByName(name)
            .orElseThrow(() -> new Exception("Not found by Name: " + name));
    }

    @Transactional
    public Category create(CategoryCreateDto createDto) {
        return Optional.of(createDto)
            .map(categoryCreateMapper::map)
            .map(categoryRepository::save)
            .get();
    }

    @Transactional
    public boolean deleteById(Long id) {
        return categoryRepository.findById(id)
            .map(category -> {
                categoryRepository.delete(category);
                return true;
            })
            .orElse(false);
    }

    @Transactional
    public boolean deleteByName(String name) {
        return categoryRepository.findByName(name)
            .map(category -> {
                categoryRepository.delete(category);
                return true;
            })
            .orElse(false);
    }

}
