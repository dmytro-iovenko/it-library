package com.dmio.library.model;

import java.util.Optional;

import lombok.Data;

@Data
public class ReviewRequest {
    private double rating;
    private String isbn;
    private Optional<String> reviewDescription;
}
