package com.pages.mapper;

import org.springframework.stereotype.Component;

import com.pages.database.entity.Property;
import com.pages.dto.PropertyReadDto;

@Component
public class PropertyReadMapper implements Mapper<Property, PropertyReadDto> {

    @Override
    public PropertyReadDto map(Property property) {
        return new PropertyReadDto(
            property.getId(), 
            property.getElementId(),
            property.getName(), 
            property.getValue()
        );
    }
    
}
