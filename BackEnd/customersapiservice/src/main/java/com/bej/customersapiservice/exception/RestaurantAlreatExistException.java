package com.bej.customersapiservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.CONFLICT,reason = "Restaurant already exist")
public class RestaurantAlreatExistException extends Exception{
}
