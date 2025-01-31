package com.chats.api.database.entity;

public interface BaseEntity<T> {

    T getId();

    void setId(T id);

}
