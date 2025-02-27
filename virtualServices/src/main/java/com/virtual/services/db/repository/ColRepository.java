package com.virtual.services.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtual.services.db.entity.Col;

@Repository
public interface ColRepository extends JpaRepository<Col, Long> {

}
