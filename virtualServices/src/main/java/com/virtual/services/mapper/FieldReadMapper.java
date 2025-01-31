package com.virtual.services.mapper;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Field;
import com.virtual.services.dto.FieldReadDto;

@Component
public class FieldReadMapper implements Mapper<Field, FieldReadDto> {
    
    @Override
    public FieldReadDto map(Field object) {
        return new FieldReadDto(
            object.getId(), 
            object.getName(), 
            object.getValue(), 
            object.getRowId()
        );
    }

}
