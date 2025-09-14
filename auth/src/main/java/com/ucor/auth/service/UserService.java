package com.ucor.auth.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ucor.auth.database.entity.Category;
import com.ucor.auth.database.entity.Role;
import com.ucor.auth.database.entity.User;
import com.ucor.auth.database.repository.CategoryRepository;
import com.ucor.auth.database.repository.UserRepository;
import com.ucor.auth.dto.CategoryCreateDto;
import com.ucor.auth.dto.SignUp;
import com.ucor.auth.dto.UserFilter;
import com.ucor.auth.dto.UserPatchDto;
import com.ucor.auth.mapper.UserCreateMapper;
import com.ucor.auth.mapper.UserPatchMapper;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    
    private final UserRepository userRepository;
    private final UserCreateMapper userCreateMapper;
    private final UserPatchMapper userPatchMapper;
    private final CategoryRepository categoryRepository;

    public UserDetails findByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    @Cacheable("users-list-cache")
    @SuppressWarnings("null")
    public Page<? extends UserDetails> findAllByFilter(UserFilter filter, Pageable pageable) {
        List<Specification<User>> spec = new ArrayList<>();

        if (filter.getUsername() != null) {
            spec.add((root, query, cb) -> cb.like(root.get("username"), "%" + filter.getUsername() + "%"));
        }
        if (filter.getTelephoneNumber() != null) {
            spec.add((root, query, cb) -> cb.like(root.get("telephoneNumber"), "%" + filter.getTelephoneNumber() + "%"));
        }
        if (filter.getYear() != null) {
            spec.add((root, query, cb) -> cb.equal(root.get("year"), filter.getYear()));
        }
        if (filter.getRole() != null) {
            spec.add((root, query, cb) -> cb.equal(root.get("role"), filter.getRole().name()));
        }
        if (filter.getCategories() != null) {
            for (CategoryCreateDto category: filter.getCategories()) {
                spec.add((root, query, cb) -> {
                    Subquery<Category> subquery = query.subquery(Category.class);
                    Root<User> subRoot = subquery.correlate(root);

                    Join<User, Category> categoryJoin = subRoot.join("categories");

                    subquery.select(categoryJoin)
                        .where(cb.like(categoryJoin.get("name"), category.getName()));
                    return cb.exists(subquery);
                });
            }
        }

        return userRepository.findAll(Specification.allOf(spec), pageable);
    }

    public UserDetails findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + id.toString()));
    }

    @Transactional
    public UserDetails create(SignUp signUp) {
        return Optional.of(signUp)
            .map(userCreateMapper::map)
            .map(userRepository::save)
            .get();
    }

    @Transactional
    public UserDetails updateRole(Long id, Role role) {
        return userRepository.findById(id)
            .map(user -> {
                user.setRole(role);
                return user;
            })
            .map(userRepository::saveAndFlush)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + id.toString()));
    }

    @Transactional
    public UserDetails addCategory(Long id, String categoryName) {
        return categoryRepository.findByName(categoryName)
            .map(category -> {
                User user = (User) findById(id);
                user.getCategories().add(category);
                return userRepository.saveAndFlush(user);
            })
            .orElseThrow(() -> new UsernameNotFoundException(String.valueOf(id)));
    }

    @Transactional
    public UserDetails deleteCategory(Long id, String categoryName) {
        return categoryRepository.findByName(categoryName)
            .map(category -> {
                User user = (User) findById(id);
                user.getCategories().remove(category);
                return userRepository.saveAndFlush(user);
            })
            .orElseThrow(() -> new UsernameNotFoundException(String.valueOf(id)));
    }
    
    @Transactional
    public UserDetails patch(Long id, UserPatchDto userPatchDto) {
        User user = (User) findById(id);
        user = userPatchMapper.map(user, userPatchDto);
        return userRepository.saveAndFlush(user);
    }

}
