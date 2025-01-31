package com.pages.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pages.database.entity.Page;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {

    Optional<Page> findByUri(String uri);

}
