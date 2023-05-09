package com.dmio.library.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dmio.library.dao.CheckoutRepository;
import com.dmio.library.entity.Checkout;

@Service
@Transactional
public class BookService {
    @Autowired
    private CheckoutRepository checkoutRepository;

    public boolean checkoutBook(String userEmail, String isbn) throws Exception {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndIsbn(userEmail, isbn);
        if (validateCheckout != null) {
            throw new Exception("Book already checked out by user");
        }
        Checkout checkout = new Checkout(
                userEmail,
                isbn,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString());

        checkoutRepository.save(checkout);
        return true;
    }

}
