package com.virtual.services.mapper;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Row;
import com.virtual.services.dto.RowCreateEditDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RowCreateEditMapper implements Mapper<RowCreateEditDto, Row> {

    @Override
    public Row map(RowCreateEditDto fromObject) {
        Row row = new Row();
        copy(fromObject, row);
        return row;
    }

    @Override
    public Row map(RowCreateEditDto fromObject, Row toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    private void copy(RowCreateEditDto fromObject, Row toObject) {
        toObject.setName(fromObject.getName());
        toObject.setServiceId(fromObject.getServiceId());
    }

}
