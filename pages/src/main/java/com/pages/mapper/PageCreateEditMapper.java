package com.pages.mapper;

import org.springframework.stereotype.Component;

import com.pages.database.entity.Page;
import com.pages.dto.PageCreateEditDto;

@Component
public class PageCreateEditMapper implements Mapper<PageCreateEditDto, Page> {

    @Override
    public Page map(PageCreateEditDto fromObject) {
        Page page = new Page();
        copy(fromObject, page);
        return page;
    }

    @Override
    public Page map(PageCreateEditDto fromObject, Page toObject) {
        copy(fromObject, toObject);
        return toObject;
    }

    private void copy(PageCreateEditDto fromObject, Page toObject) {
        toObject.setUri(fromObject.getUri());
    }

}
