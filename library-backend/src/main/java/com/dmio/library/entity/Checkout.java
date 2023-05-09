package com.dmio.library.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="checkout")
@Data
@NoArgsConstructor
public class Checkout {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "checkout_date")
    private String checkoutDate;

    @Column(name = "return_date")
    private String returnDate;

    public Checkout(String userEmail, String isbn, String checkoutDate, String returnDate) {
		this.userEmail = userEmail;
		this.isbn = isbn;
		this.checkoutDate = checkoutDate;
		this.returnDate = returnDate;
	}

}
