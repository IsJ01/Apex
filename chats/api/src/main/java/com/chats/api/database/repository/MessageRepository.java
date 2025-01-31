package com.chats.api.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chats.api.database.entity.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    
}
