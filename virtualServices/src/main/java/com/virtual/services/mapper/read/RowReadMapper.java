package com.virtual.services.mapper.read;

import java.util.List;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Row;
import com.virtual.services.dto.read.FieldReadDto;
import com.virtual.services.dto.read.RowReadDto;
import com.virtual.services.mapper.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RowReadMapper implements Mapper<Row, RowReadDto> {

    private final FieldReadMapper fieldReadMapper;

    @Override
    public RowReadDto map(Row object) {
        List<FieldReadDto> fields = object.getFields().stream()
            .map(fieldReadMapper::map)
            .toList();

        return new RowReadDto(
            object.getId(), 
            object.getTab().getId(), 
            fields
        );
    }

}
