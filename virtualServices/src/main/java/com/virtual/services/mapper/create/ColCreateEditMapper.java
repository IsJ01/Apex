package com.virtual.services.mapper.create;

import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Col;
import com.virtual.services.db.repository.TabRepository;
import com.virtual.services.dto.createEdit.ColCreateEditDto;
import com.virtual.services.mapper.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ColCreateEditMapper implements Mapper<ColCreateEditDto, Col> {

    private final TabRepository tabRepository;
    
    @Override
    public Col map(ColCreateEditDto fromObject, Col toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    @Override
    public Col map(ColCreateEditDto object) {
        Col newCol = new Col();
        copy(object, newCol);
        return newCol;
    }

    private void copy(ColCreateEditDto fromObject, Col toObject) {
        tabRepository.findById(fromObject.getTabId())
            .map(tab -> {
                toObject.setTab(tab);
                return true;
            })
            .orElseThrow(() -> new ObjectNotFoundException(fromObject.getTabId(), "Tab"));
        
        toObject.setName(fromObject.getValue());
    }

}
