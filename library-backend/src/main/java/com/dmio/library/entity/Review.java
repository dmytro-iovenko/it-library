package com.dmio.library.entity;

import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="reviews")
@Data
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "date")
    @CreationTimestamp
    private Date date;

    @Column(name = "rating")
    private double rating;

    @Column(name = "isbn")
    private String isbn;

    @Lob
    @Column(name = "review_description")
    private String reviewDescription;

    public Review(String isbn, String userEmail, double rating, String reviewDescription) {
		this.isbn = isbn;
		this.userEmail = userEmail;
		this.rating = rating;
		this.reviewDescription = reviewDescription;
	}

	public void updateFields(Review r) {
		this.setIsbn(r.getIsbn());
		this.setUserEmail(r.getUserEmail());
		this.setRating(r.getRating());
		this.setReviewDescription(r.getReviewDescription());
	}

}
