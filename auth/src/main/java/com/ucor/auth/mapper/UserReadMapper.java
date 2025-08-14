package com.ucor.auth.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ucor.auth.database.entity.User;
import com.ucor.auth.dto.CategoryReadDto;
import com.ucor.auth.dto.UserReadDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserReadMapper {

    public UserReadDto map(User user) {
        List<CategoryReadDto> categories = user.getCategories()
            .stream()
            .map(category -> new CategoryReadDto(category.getName()))
            .toList();

        UserReadDto dto = new UserReadDto(
            user.getId(), 
            user.getUsername(),
            user.getTelephoneNumber(),
            user.getYear(),
            user.getRole().name(), 
            categories);
            
        return dto;
    }

}
