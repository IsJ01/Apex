package com.virtual.services.mapper.create;

import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Component;

import com.virtual.services.db.entity.Field;
import com.virtual.services.db.repository.ColRepository;
import com.virtual.services.db.repository.RowRepository;
import com.virtual.services.dto.createEdit.FieldCreateEditDto;
import com.virtual.services.mapper.Mapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FieldCreateEditMapper implements Mapper<FieldCreateEditDto, Field> {

    private final ColRepository colRepository;
    private final RowRepository rowRepository;

    @Override
    public Field map(FieldCreateEditDto object) {
        Field newField = new Field();
        copy(object, newField);
        return newField;
    }

    @Override
    public Field map(FieldCreateEditDto fromObject, Field toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    private void copy(FieldCreateEditDto fromObject, Field toObject) {
        rowRepository.findById(fromObject.getRowId())
            .map(row -> {
                toObject.setRow(row);
                return true;
            })
            .orElseThrow(() -> new ObjectNotFoundException(fromObject.getRowId(), "Row"));

        colRepository.findById(fromObject.getColId())
            .map(col -> {
                toObject.setCol(col);
                return true;
            })
            .orElseThrow(() -> new ObjectNotFoundException(fromObject.getColId(), "Col"));
            
        toObject.setValue(fromObject.getValue());
    }

}
