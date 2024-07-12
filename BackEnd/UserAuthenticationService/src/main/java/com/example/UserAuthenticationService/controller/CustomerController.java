package com.example.UserAuthenticationService.controller;

import com.example.UserAuthenticationService.domain.Customer;
import com.example.UserAuthenticationService.exception.CustomerAlreadyExistException;
import com.example.UserAuthenticationService.exception.CustomerNotFoundException;
import com.example.UserAuthenticationService.exception.InvalidCredentialsExceptions;
import com.example.UserAuthenticationService.services.CustomerService;
import com.example.UserAuthenticationService.services.SecurityTokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private SecurityTokenGenerator securityTokenGenerator;

    ResponseEntity responseEntity=null;

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer)
    {
        try{
            responseEntity=new ResponseEntity<>(customerService.saveCustomer(customer), HttpStatus.CREATED);
        }catch(Exception ex)
        {
            responseEntity=new ResponseEntity<>("Problem in controller",HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody Customer customer) throws InvalidCredentialsExceptions, CustomerNotFoundException {
        try {
            Customer customerObj = customerService.loginCustomer(customer.getCustomerEmail(), customer.getCustomerPassword());
            System.out.println("customer obj---");
            System.out.println(customerObj);
            System.out.println("customer---");
            System.out.println(customer);
            if (customerObj == null) {
                throw new InvalidCredentialsExceptions();
            }
            String token = securityTokenGenerator.createToken(customerObj);
            responseEntity = new ResponseEntity<>(token,HttpStatus.OK);
        }

        catch (CustomerNotFoundException e) {
            responseEntity = new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);

        }
        return responseEntity;
    }


}
