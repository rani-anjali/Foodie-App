package com.example.RestaurantService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND,reason="No Restaurant available")
public class NoRestaurantAvailableException extends Exception{
    public NoRestaurantAvailableException(String message) {
        super(message);
    }
}
