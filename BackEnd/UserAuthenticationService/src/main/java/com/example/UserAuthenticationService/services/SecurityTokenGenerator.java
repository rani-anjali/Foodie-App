package com.example.UserAuthenticationService.services;

import com.example.UserAuthenticationService.domain.Customer;

import java.util.Map;

public interface SecurityTokenGenerator {
    String createToken(Customer customer);

}
