package com.bej.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT, reason="Do you want to delete present items in cart")
public class RestaurantAlreadyExistException extends Exception{
}
