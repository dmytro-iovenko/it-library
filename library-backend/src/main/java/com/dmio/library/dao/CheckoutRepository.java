package com.dmio.library.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmio.library.entity.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Optional<Checkout> findByUserEmailAndIsbn(String userEmail, String isbn);
}
