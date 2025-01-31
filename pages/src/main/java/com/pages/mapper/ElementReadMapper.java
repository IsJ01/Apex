package com.pages.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.pages.database.entity.Element;
import com.pages.dto.ElementReadDto;
import com.pages.dto.PropertyReadDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ElementReadMapper implements Mapper<Element, ElementReadDto> {

    private final PropertyReadMapper propertyReadMapper;
    
    @Override
    public ElementReadDto map(Element fromObject) {

        List<ElementReadDto> childrens = fromObject.getChildrens().stream()
            .map(this::map)
            .toList();
            
        List<PropertyReadDto> properties = fromObject.getElementsProperties().stream()
            .map(propertyReadMapper::map)
            .toList();

        return new ElementReadDto(
            fromObject.getId(), 
            fromObject.getPageId(), 
            fromObject.getParentId(), 
            fromObject.getValue(), 
            childrens,
            properties
        );
    }
}
