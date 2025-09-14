package com.ucor.auth.http.rest;

import org.springframework.web.bind.annotation.RestController;

import com.ucor.auth.database.entity.Role;
import com.ucor.auth.database.entity.User;
import com.ucor.auth.dto.CategoryCreateDto;
import com.ucor.auth.dto.UserFilter;
import com.ucor.auth.dto.UserPatchDto;
import com.ucor.auth.dto.UserReadDto;
import com.ucor.auth.mapper.AuthCookieMapper;
import com.ucor.auth.mapper.UserReadMapper;
import com.ucor.auth.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.concurrent.CompletableFuture;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
@Slf4j
public class UserRestController {

    private final UserService userService;
    private final UserReadMapper userReadMapper;
    private final AuthCookieMapper authCookieMapper;

    @Async
    @GetMapping("api/v1/public/users")
    public CompletableFuture<PagedModel<UserReadDto>> findAllByFilter(UserFilter filter, 
        @PageableDefault(size = 10, page = 0) Pageable pageable) {
        Page<User> page = (Page<User>) userService.findAllByFilter(filter, pageable);
        return CompletableFuture.completedFuture(
            new PagedModel<>(page.map(userReadMapper::map))
        );
    }

    @GetMapping("api/v1/public/users/{id}")
    public UserReadDto findById(@PathVariable Long id) {
        return userReadMapper.map((User) userService.findById(id));
    }

    @GetMapping("api/v1/users/current")
    public UserReadDto current(@AuthenticationPrincipal UserDetails userDetails) {
        return userReadMapper.map((User) userDetails);
    }

    @PatchMapping("api/v1/users/{id}/categories")
    public ResponseEntity<?> addCategory(@PathVariable Long id, @RequestBody CategoryCreateDto category,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = (User) userService.findById(id);
    
        if (User.hasRights(userDetails, user)) {
            return ResponseEntity.ok().body(
                userReadMapper.map((User) userService.addCategory(id, category.getName()))
            );
        }
        return ResponseEntity.status(403).build();
    }

    @DeleteMapping("api/v1/users/{id}/categories")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id, CategoryCreateDto category,
            @AuthenticationPrincipal UserDetails userDetails) throws UnsupportedEncodingException {
        User user = (User) userService.findById(id);
        if (User.hasRights(userDetails, user)) {
            return ResponseEntity.ok().body(
                userReadMapper.map((User) userService.deleteCategory(id, URLDecoder.decode(category.getName(), "UTF-8")))
            );
        }
        return ResponseEntity.status(403).build();
    }

    @PostMapping("api/v1/users/logout")
    public ResponseEntity<?> logout() throws UnsupportedEncodingException {
        return ResponseEntity.ok()
            .header("Set-Cookie", authCookieMapper.getLogoutCookie().toString())
            .build();
    }

    @PatchMapping("/api/v1/users/{id}")
    public ResponseEntity<?> patch(@PathVariable Long id, @RequestBody UserPatchDto userPatchDto, 
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = (User) userService.findById(id);
        if (
            (userPatchDto.getRole() != null && !User.isAdmin(userDetails)) || 
            (userPatchDto.getRole() != null && userPatchDto.getRole().equals(Role.ADMIN)) || 
            (userPatchDto.getRole() != null && user.getUsername().equals(userDetails.getUsername()))
        ) {
            return ResponseEntity.status(403).build();
        }

        if (User.hasRights(userDetails, user)) {
            return ResponseEntity.ok()
                .body(userService.patch(id, userPatchDto));
        }
        return ResponseEntity.status(403).build();
    }

}
