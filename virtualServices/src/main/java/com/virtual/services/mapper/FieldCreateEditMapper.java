package com.virtual.services.mapper;

import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Field;
import com.virtual.services.dto.FieldCreateEditDto;

@Component
public class FieldCreateEditMapper implements Mapper<FieldCreateEditDto, Field> {

    @Override
    public Field map(FieldCreateEditDto fromObject) {
        Field field = new Field();
        copy(fromObject, field);
        return field;
    }

    @Override
    public Field map(FieldCreateEditDto fromObject, Field toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    private void copy(FieldCreateEditDto fromObject, Field toObject) {
        toObject.setName(fromObject.getName());
        toObject.setValue(fromObject.getValue());
        toObject.setRowId(fromObject.getRowId());
    }

}
