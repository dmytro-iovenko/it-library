package com.dmio.library.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dmio.library.dao.CheckoutRepository;
import com.dmio.library.entity.Checkout;
import com.dmio.library.model.CurrentLoans;

@Service
@Transactional
public class BookService {
    @Autowired
    private CheckoutRepository checkoutRepository;

    public Checkout checkoutBook(String userEmail, String isbn) throws Exception {
        var validateCheckout = checkoutRepository.findByUserEmailAndIsbn(userEmail, isbn);
        if (validateCheckout != null)
            throw new Exception("Book already checked out by user");
        Checkout checkout = new Checkout(
                userEmail,
                isbn,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString());
        return checkoutRepository.save(checkout);
    }

    public Boolean checkoutBookByUser(String userEmail, String isbn) {
        var validateCheckout = checkoutRepository.findByUserEmailAndIsbn(userEmail, isbn);
        return (validateCheckout != null);
    }

    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }

    public List<CurrentLoans> currentLoans(String userEmail) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        List<CurrentLoans> currentLoansList = new ArrayList<>();
        var checkoutList = checkoutRepository.findBooksByUserEmail(userEmail);
        for (var checkout : checkoutList) {
            Date returnDate = sdf.parse(checkout.getReturnDate());
            Date currentDate = sdf.parse(LocalDate.now().toString());
            int daysLeft = (int) TimeUnit.DAYS.convert(returnDate.getTime() - currentDate.getTime(),
                    TimeUnit.MILLISECONDS);
            currentLoansList.add(new CurrentLoans(checkout.getIsbn(), daysLeft));
        }
        return currentLoansList;
    }

}
