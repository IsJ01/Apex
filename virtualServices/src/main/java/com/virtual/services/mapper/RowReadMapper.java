package com.virtual.services.mapper;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Row;
import com.virtual.services.dto.FieldReadDto;
import com.virtual.services.dto.RowReadDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RowReadMapper implements Mapper<Row, RowReadDto> {

    private final FieldReadMapper fieldReadMapper;

    @Override
    public RowReadDto map(Row object) {
        List<FieldReadDto> fields = Optional.ofNullable(object.getFields())
                                        .map(obj -> {
                                                return obj.stream()
                                                    .map(fieldReadMapper::map)
                                                    .toList();
                                            }   
                                        ).orElse(null);
                                        
        return new RowReadDto(
            object.getId(),
            object.getName(),
            fields, 
            object.getServiceId()
        );
    }

}
