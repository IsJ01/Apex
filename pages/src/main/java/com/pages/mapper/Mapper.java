package com.pages.mapper;

public interface Mapper<F, T> {

    T map(F fromObject);

    default T map(F fromObject, T toObject) {
        return toObject;
    }

}
