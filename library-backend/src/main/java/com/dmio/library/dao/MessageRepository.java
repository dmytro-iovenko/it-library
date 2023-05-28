package com.dmio.library.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmio.library.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    
}
