package com.virtual.services.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtual.services.db.entity.Row;

@Repository
public interface RowRepository extends JpaRepository<Row, Long> {
    
}
