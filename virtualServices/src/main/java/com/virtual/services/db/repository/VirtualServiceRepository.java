package com.virtual.services.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtual.services.db.entity.VirtualService;
import java.util.Optional;


@Repository
public interface VirtualServiceRepository extends JpaRepository<VirtualService, Long> {

    public Optional<VirtualService> findByName(String name);

}
