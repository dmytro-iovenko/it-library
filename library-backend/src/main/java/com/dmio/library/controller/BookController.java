package com.dmio.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dmio.library.entity.Checkout;
import com.dmio.library.model.CurrentLoans;
import com.dmio.library.service.BookService;
import com.dmio.library.utils.ExtractJWT;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @PutMapping("/secure/checkout")
    public ResponseEntity<Checkout> checkoutBook(@RequestHeader(value = "Authorization") String token,
            @RequestParam String isbn) throws Exception {
        String userEmail = ExtractJWT.jwtExtraction(token, "sub");
        return new ResponseEntity<>(bookService.checkoutBook(userEmail, isbn), HttpStatus.OK);
    }

    @GetMapping("/secure/isCheckedOutByUser")
    public ResponseEntity<Boolean> checkoutBookByUser(@RequestHeader(value = "Authorization") String token,
            @RequestParam String isbn) {
        String userEmail = ExtractJWT.jwtExtraction(token, "sub");
        return new ResponseEntity<>(bookService.checkoutBookByUser(userEmail, isbn), HttpStatus.OK);
    }

    @GetMapping("/secure/currentLoans")
    public ResponseEntity<List<CurrentLoans>> currentLoans(@RequestHeader(value = "Authorization") String token)
            throws Exception {
        String userEmail = ExtractJWT.jwtExtraction(token, "sub");
        return new ResponseEntity<>(bookService.currentLoans(userEmail), HttpStatus.OK);
    }

    @GetMapping("/secure/currentLoans/count")
    public ResponseEntity<Integer> currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJWT.jwtExtraction(token, "sub");
        return new ResponseEntity<>(bookService.currentLoansCount(userEmail), HttpStatus.OK);
    }

    @PutMapping("/secure/return")
    public ResponseEntity<HttpStatus> returnBook(@RequestHeader(value = "Authorization") String token,
            @RequestParam String isbn) throws Exception {
        String userEmail = ExtractJWT.jwtExtraction(token, "sub");
        bookService.returnBook(userEmail, isbn);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
