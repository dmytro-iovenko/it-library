package com.dmio.library.service;

import java.sql.Date;
import java.time.LocalDate;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dmio.library.dao.ReviewRepository;
import com.dmio.library.entity.Review;
import com.dmio.library.model.ReviewRequest;

@Service
@Transactional
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public Review postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndIsbn(userEmail, reviewRequest.getIsbn());
        if (validateReview != null) {
            throw new Exception("Review already created");
        }
        Review review = new Review();
        review.setUserEmail(userEmail);
        review.setIsbn(reviewRequest.getIsbn());
        review.setRating(reviewRequest.getRating());
        if (reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        return reviewRepository.save(review);
    }

    public Boolean userReviewListed(String userEmail, String isbn) {
        Review validateReview = reviewRepository.findByUserEmailAndIsbn(userEmail, isbn);
        return (validateReview != null);
    }

}
