package com.virtual.services.mapper.read;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Field;
import com.virtual.services.dto.read.FieldReadDto;
import com.virtual.services.mapper.Mapper;

@Component
public class FieldReadMapper implements Mapper<Field, FieldReadDto> {

    @Override
    public FieldReadDto map(Field object) {
        return new FieldReadDto(
            object.getId(), 
            object.getCol().getId(), 
            object.getCol().getName(), 
            object.getValue()
        );
    }

}
