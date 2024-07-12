package com.example.UserAuthenticationService.services;

import com.example.UserAuthenticationService.domain.Customer;
import com.example.UserAuthenticationService.exception.CustomerAlreadyExistException;
import com.example.UserAuthenticationService.exception.CustomerNotFoundException;
import com.example.UserAuthenticationService.exception.InvalidCredentialsExceptions;
import com.example.UserAuthenticationService.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService{
    @Autowired
    private CustomerRepo customerRepo;
    @Override
    public Customer saveCustomer(Customer customer) throws CustomerAlreadyExistException {
        if(customerRepo.findById(customer.getCustomerId()).isPresent())
        {
            throw new CustomerAlreadyExistException();
        }
        return customerRepo.save(customer);
    }

    @Override
    public Customer loginCustomer(String customerEmail, String customerPassword) throws InvalidCredentialsExceptions, CustomerNotFoundException {
        Customer customer=customerRepo.findByCustomerEmailAndCustomerPassword(customerEmail,customerPassword);
        if(customer==null)
        {
            throw new CustomerNotFoundException();
        }
        return customer;
    }


    @Override
    public List<Customer> getAllCustomer() {
        return customerRepo.findAll();
    }

    @Override
    public boolean deleteCustomer(String customerId) throws CustomerNotFoundException {
        boolean isDeleted=false;
        if(customerRepo.findById(customerId).isEmpty())
        {
            throw new CustomerNotFoundException();

        }else {
            customerRepo.deleteById(customerId);
            isDeleted=true;
        }
        return isDeleted;
    }
}
