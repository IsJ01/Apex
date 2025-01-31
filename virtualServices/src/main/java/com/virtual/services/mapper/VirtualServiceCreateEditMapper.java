package com.virtual.services.mapper;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.VirtualService;
import com.virtual.services.dto.VirtualServiceCreateEditDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class VirtualServiceCreateEditMapper implements Mapper<VirtualServiceCreateEditDto, VirtualService> {

    @Override
    public VirtualService map(VirtualServiceCreateEditDto object) {
        VirtualService virtualService = new VirtualService();
        copy(object, virtualService);
        return virtualService;
    }

    @Override
    public VirtualService map(VirtualServiceCreateEditDto fromObject, VirtualService toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    private void copy(VirtualServiceCreateEditDto fromObject, VirtualService toObject) {
        toObject.setName(fromObject.getName());
    }

}
