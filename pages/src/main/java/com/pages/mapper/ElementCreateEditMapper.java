package com.pages.mapper;

import org.springframework.stereotype.Component;

import com.pages.database.entity.Element;
import com.pages.dto.ElementCreateEditDto;

@Component
public class ElementCreateEditMapper implements Mapper<ElementCreateEditDto, Element> {

    @Override
    public Element map(ElementCreateEditDto fromObject) {
        Element element = new Element();
        copy(fromObject, element);
        return element;
    }

    @Override
    public Element map(ElementCreateEditDto fromObject, Element toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    private void copy(ElementCreateEditDto fromObject, Element toObject) {
        Long parentId = fromObject.getParentId();
        toObject.setPageId(fromObject.getPageId());
        toObject.setParentId(parentId != null ? parentId : -1L);
        toObject.setValue(fromObject.getValue());
    }

}
