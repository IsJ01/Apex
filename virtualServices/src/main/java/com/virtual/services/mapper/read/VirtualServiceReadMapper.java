package com.virtual.services.mapper.read;

import java.util.List;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.VirtualService;
import com.virtual.services.dto.read.TabReadDto;
import com.virtual.services.dto.read.VirtualServiceReadDto;
import com.virtual.services.mapper.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class VirtualServiceReadMapper implements Mapper<VirtualService, VirtualServiceReadDto> {

    private final TabReadMapper tabReadMapper;

    @Override
    public VirtualServiceReadDto map(VirtualService object) {
        List<TabReadDto> tabs = object.getTabs().stream()
            .map(tabReadMapper::map)
            .toList();

        return new VirtualServiceReadDto(
            object.getId(), 
            object.getName(), 
            tabs
        );
    }

}
