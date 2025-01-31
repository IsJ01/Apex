package com.chats.api.mapper;

public interface Mapper<F, T> {

    default T map(F fromObject, T toObject) {
        return toObject;
    }

    T map(F object);

}
