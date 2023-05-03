package com.dmio.library.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmio.library.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
    
}
