package com.virtual.services.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtual.services.db.entity.Row;

@Repository
public interface RowRepository extends JpaRepository<Row, Long> {

    Optional<Row> findByName(String name);

    Optional<Row> findAllByServiceId(Long id);

}
