package com.virtual.services.mapper.create;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.VirtualService;
import com.virtual.services.dto.createEdit.VirtualServiceCreateEditDto;
import com.virtual.services.mapper.Mapper;

@Component
public class VirtualServiceCreateEditMapper implements Mapper<VirtualServiceCreateEditDto, VirtualService> {

    @Override
    public VirtualService map(VirtualServiceCreateEditDto fromObject, VirtualService toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    @Override
    public VirtualService map(VirtualServiceCreateEditDto object) {
        VirtualService newVirtualService = new VirtualService();
        copy(object, newVirtualService);
        return newVirtualService;
    }

    private void copy(VirtualServiceCreateEditDto fromObject, VirtualService toObject) {
        toObject.setName(fromObject.getName());
    }

}
