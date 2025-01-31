package com.virtual.services.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtual.services.db.entity.Field;

@Repository
public interface FieldRepository extends JpaRepository<Field, Long> {
    
    Optional<Field> findByName(String name);
    
    Optional<Field> findAllByRowId(Long id);

}
