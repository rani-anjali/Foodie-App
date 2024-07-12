package com.bej.customersapiservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Customer Already Exist")
public class CustomerAlreadyExistException extends Exception {
    public CustomerAlreadyExistException()
    {
        super();
    }
}
