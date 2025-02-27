package com.virtual.services.mapper.read;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Col;
import com.virtual.services.dto.read.ColReadDto;
import com.virtual.services.mapper.Mapper;

@Component
public class ColReadMapper implements Mapper<Col, ColReadDto> {

    @Override
    public ColReadDto map(Col object) {
        return new ColReadDto(
            object.getId(), 
            object.getTab().getId(), 
            object.getName()
        );
    }

}
