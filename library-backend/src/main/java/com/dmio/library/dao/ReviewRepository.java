package com.dmio.library.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import com.dmio.library.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByIsbn(@RequestParam("isbn") String isbn, Pageable pageable);
    Review findByUserEmailAndIsbn(String userEmail, String isbn);
}
