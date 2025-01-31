package com.virtual.services.db.entity;

public interface BaseEntity<T> {

    T getId();
    
    void setId(T id);

}
