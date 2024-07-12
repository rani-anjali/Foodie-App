package com.example.UserAuthenticationService.services;

import com.example.UserAuthenticationService.domain.Customer;
import com.example.UserAuthenticationService.exception.CustomerAlreadyExistException;
import com.example.UserAuthenticationService.exception.CustomerNotFoundException;
import com.example.UserAuthenticationService.exception.InvalidCredentialsExceptions;

import java.util.List;

public interface CustomerService {
    Customer saveCustomer(Customer customer) throws CustomerAlreadyExistException;
    Customer loginCustomer(String customerEmail,String customerPassword) throws InvalidCredentialsExceptions, CustomerNotFoundException;
    List<Customer> getAllCustomer();
    boolean deleteCustomer(String customerId) throws CustomerNotFoundException;
}
