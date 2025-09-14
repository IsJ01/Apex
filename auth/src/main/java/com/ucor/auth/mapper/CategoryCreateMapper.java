package com.ucor.auth.mapper;

import org.springframework.stereotype.Component;

import com.ucor.auth.database.entity.Category;
import com.ucor.auth.dto.CategoryCreateDto;

@Component
public class CategoryCreateMapper {

    public Category map(CategoryCreateDto categoryCreateDto) {
        Category category = new Category();
        category.setName(categoryCreateDto.getName());
        return category;
    }

}
