package com.bej.services;

import com.bej.exceptions.OrderNotFoundException;

public interface GenerateEmail {
    public String orderCompletionEmail(String orderId,String customerName) throws OrderNotFoundException;
}
