package com.pages.mapper;

import org.springframework.stereotype.Component;

import com.pages.database.entity.Property;
import com.pages.dto.PropertyCreateEditDto;

@Component
public class PropertyCreateEditMapper implements Mapper<PropertyCreateEditDto, Property>  {

    @Override
    public Property map(PropertyCreateEditDto fromObject) {
        Property property = new Property();
        copy(fromObject, property);
        return property;
    }

    @Override
    public Property map(PropertyCreateEditDto fromObject, Property toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    private void copy(PropertyCreateEditDto fromObject, Property toObject) {
        toObject.setElementId(fromObject.getElementId());
        toObject.setName(fromObject.getName());
        toObject.setValue(fromObject.getValue());
    }

}
