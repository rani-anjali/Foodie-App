package com.example.UserAuthenticationService.repository;

import com.example.UserAuthenticationService.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer,String> {
    Customer findByCustomerEmailAndCustomerPassword(String customerEmail, String customerPassword);
}
