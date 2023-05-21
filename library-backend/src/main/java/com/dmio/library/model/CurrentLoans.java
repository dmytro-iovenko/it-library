package com.dmio.library.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CurrentLoans {
    private String isbn;
    private int daysLeft;
}
