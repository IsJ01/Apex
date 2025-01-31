package com.virtual.services.mapper;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.VirtualService;
import com.virtual.services.dto.RowReadDto;
import com.virtual.services.dto.VirtualServiceReadDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class VirtualServiceReadMapper implements Mapper<VirtualService, VirtualServiceReadDto> {

    private final RowReadMapper rowReadMapper;

    @Override
    public VirtualServiceReadDto map(VirtualService object) {
        List<RowReadDto> rows = Optional.ofNullable(object.getRows())
                                            .map(obj -> {
                                                    return obj.stream()
                                                    .map(rowReadMapper::map)
                                                    .toList();
                                                }
                                            )
                                            .orElse(null);
                                        
        return new VirtualServiceReadDto(
            object.getId(), 
            object.getName(),
            rows
        );
    }

}
