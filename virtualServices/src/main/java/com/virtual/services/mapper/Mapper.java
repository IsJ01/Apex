package com.virtual.services.mapper;

public interface Mapper<F, T> {

    public default T map(F fromObject, T toObject) {
        return toObject;
    }

    public T map(F object);

}
