package com.dmio.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmio.library.entity.Review;
import com.dmio.library.model.ReviewRequest;
import com.dmio.library.service.ReviewService;
import com.dmio.library.utils.ExtractJWT;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/secure/postReview")
    public ResponseEntity<Review> postReview(@RequestHeader(value = "Authorization") String token,
            @RequestBody ReviewRequest reviewRequest) throws Exception {
        String userEmail = ExtractJWT.jwtExtraction(token, "sub");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        return new ResponseEntity<>(reviewService.postReview(userEmail, reviewRequest), HttpStatus.OK);
    }

}
