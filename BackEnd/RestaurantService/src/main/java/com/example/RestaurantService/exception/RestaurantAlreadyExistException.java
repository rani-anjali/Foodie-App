package com.example.RestaurantService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT)
public class RestaurantAlreadyExistException extends Exception {

    public RestaurantAlreadyExistException(String message) {
        super(message);
    }

}
