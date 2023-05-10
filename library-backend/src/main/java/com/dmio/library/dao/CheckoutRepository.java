package com.dmio.library.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmio.library.entity.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Checkout findByUserEmailAndIsbn(String userEmail, String isbn);

    List<Checkout> findBooksByUserEmail(String userEmail);

}
