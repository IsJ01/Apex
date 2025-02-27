package com.virtual.services.mapper.read;

import java.util.List;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Tab;
import com.virtual.services.dto.read.ColReadDto;
import com.virtual.services.dto.read.RowReadDto;
import com.virtual.services.dto.read.TabReadDto;
import com.virtual.services.mapper.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TabReadMapper implements Mapper<Tab, TabReadDto> {

    private final RowReadMapper rowReadMapper;
    private final ColReadMapper colReadMapper;

    @Override
    public TabReadDto map(Tab object) {
        List<RowReadDto> rows = object.getRows().stream()
            .map(rowReadMapper::map)
            .toList();
        List<ColReadDto> cols = object.getCols().stream()
            .map(colReadMapper::map)
            .toList();
        
        return new TabReadDto(
            object.getId(), 
            object.getVirtualService().getId(), 
            object.getName(), 
            rows, 
            cols
        );
    }

}
