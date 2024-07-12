package com.bej.customersapiservice.respository;

import com.bej.customersapiservice.domain.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface CustomerRepo extends MongoRepository<Customer, String> {
    Optional<Customer> findByCustomerEmail(String customerEmail);
}