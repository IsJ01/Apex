package com.virtual.services.mapper.create;

import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Row;
import com.virtual.services.db.repository.TabRepository;
import com.virtual.services.dto.createEdit.RowCreateEditDto;
import com.virtual.services.mapper.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RowCreateEditMapper implements Mapper<RowCreateEditDto, Row> {

    private final TabRepository tabRepository;
    
    @Override
    public Row map(RowCreateEditDto fromObject, Row toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    @Override
    public Row map(RowCreateEditDto object) {
        Row newRow = new Row();
        copy(object, newRow);
        return newRow;
    }

    private void copy(RowCreateEditDto fromObject, Row toObject) {
        tabRepository.findById(fromObject.getTabId())
            .map(tab -> {
                toObject.setTab(tab);
                return true;
            })
            .orElseThrow(() -> new ObjectNotFoundException(fromObject.getTabId(), "Tab"));
    }

}
