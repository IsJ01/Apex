package com.pages.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pages.database.entity.Property;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

}
