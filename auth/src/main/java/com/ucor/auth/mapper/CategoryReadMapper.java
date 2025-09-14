package com.ucor.auth.mapper;

import org.springframework.stereotype.Component;

import com.ucor.auth.database.entity.Category;
import com.ucor.auth.dto.CategoryReadDto;

@Component
public class CategoryReadMapper {

    public CategoryReadDto map(Category category) {
        return new CategoryReadDto(
            category.getId(), 
            category.getName()
        );
    }

}
