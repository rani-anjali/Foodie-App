package com.example.UserAuthenticationService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.UNAUTHORIZED,reason = "Invalid credentials")
public class InvalidCredentialsExceptions extends Exception {
}
