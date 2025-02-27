package com.virtual.services.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtual.services.db.entity.Tab;
import com.virtual.services.db.entity.VirtualService;

@Repository
public interface TabRepository extends JpaRepository<Tab, Long> {

    Optional<Tab> findByNameAndVirtualService(String name, VirtualService service);

}
