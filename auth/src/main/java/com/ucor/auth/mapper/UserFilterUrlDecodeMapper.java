package com.ucor.auth.mapper;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import com.ucor.auth.dto.CategoryCreateDto;
import com.ucor.auth.dto.UserFilter;

import lombok.Value;

@Value
public class UserFilterUrlDecodeMapper {

    public UserFilter map(UserFilter filter) throws UnsupportedEncodingException {
        List<CategoryCreateDto> decodeCategoryFilter = new ArrayList<>();
        
        for (CategoryCreateDto category: filter.getCategories()) {
            decodeCategoryFilter.add(new CategoryCreateDto(
                URLDecoder.decode(category.getName(), "UTF-8")
            ));
        }

        UserFilter decodeFilter = new UserFilter(
            URLDecoder.decode(filter.getUsername(), "UTF-8"), 
            filter.getTelephoneNumber(), 
            filter.getYear(), 
            filter.getRole(),
            decodeCategoryFilter
        );
        return decodeFilter;
    }

}
