package com.virtual.services.mapper.create;

import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Tab;
import com.virtual.services.db.repository.VirtualServiceRepository;
import com.virtual.services.dto.createEdit.TabCreateEditDto;
import com.virtual.services.mapper.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TabCreateEditMapper implements Mapper<TabCreateEditDto, Tab> {

    private final VirtualServiceRepository virtualServiceRepository;
    
    @Override
    public Tab map(TabCreateEditDto fromObject, Tab toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    @Override
    public Tab map(TabCreateEditDto object) {
        Tab newTab = new Tab();
        copy(object, newTab);
        return newTab;
    }

    private void copy(TabCreateEditDto fromObject, Tab toObject) {
        virtualServiceRepository.findById(fromObject.getServiceId())
            .map(service -> {
                toObject.setVirtualService(service);
                return true;
            })
            .orElseThrow(() -> new ObjectNotFoundException(fromObject.getServiceId(), "VirtualService"));
        
        toObject.setName(fromObject.getName());
    }

}
