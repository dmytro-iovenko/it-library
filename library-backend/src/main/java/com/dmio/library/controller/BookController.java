package com.dmio.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dmio.library.entity.Checkout;
import com.dmio.library.service.BookService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @PutMapping("/checkout")
    public ResponseEntity<Checkout> checkoutBook(@RequestParam String isbn) throws Exception {
        String userEmail = "test.user@email.com";
        return new ResponseEntity<>(bookService.checkoutBook(userEmail, isbn), HttpStatus.OK);
    }

    @GetMapping("/isCheckedOutByUser")
    public ResponseEntity<Boolean> checkoutBookByUser(@RequestParam String isbn) {
        String userEmail = "test.user@email.com";
        return new ResponseEntity<>(bookService.checkoutBookByUser(userEmail, isbn), HttpStatus.OK);
    }

    @GetMapping("/currentLoans/count")
    public ResponseEntity<Integer> currentLoansCount() {
        String userEmail = "test.user@email.com";
        return new ResponseEntity<>(bookService.currentLoansCount(userEmail), HttpStatus.OK);
    }

}
