package com.pages.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pages.database.entity.Element;

@Repository
public interface ElementRepository extends JpaRepository<Element, Long> {
    
    List<Element> findAllByPageId(Long id);

}
