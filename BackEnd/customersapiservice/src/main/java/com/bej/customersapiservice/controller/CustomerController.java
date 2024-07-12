package com.bej.customersapiservice.controller;

import com.bej.customersapiservice.domain.Address;
import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.emails.IGenerateEmails;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.exception.CustomerNotFoundException;
import com.bej.customersapiservice.exception.RestaurantAlreatExistException;
import com.bej.customersapiservice.exception.SameEmailException;
import com.bej.customersapiservice.services.EmailService;
import com.bej.customersapiservice.services.ICustomerService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
//@PropertySource("classPath:application.properties")
@RequestMapping("/api/v2")
@CrossOrigin
public class CustomerController {

    @Autowired
    private ICustomerService iCustomerService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private IGenerateEmails iGenerateEmails;


    @Value("${spring.servlet.multipart.location}")
    private String path;

    @PostMapping("/register")
    public ResponseEntity registerCustomer(@RequestBody Customer customer) {
        try {
            ResponseEntity<?> response =  new ResponseEntity(iCustomerService.registerCustomer(customer), HttpStatus.CREATED);
            emailService.sendEmail(customer.getCustomerEmail(),"Welcome To DishDash", iGenerateEmails.generateWelcomeEmail(customer.getCustomerName(), customer.getCustomerEmail(), customer.getCustomerPassword()));
            return response;
        } catch (CustomerAlreadyExistException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }catch (SameEmailException ex)
        {
            return new ResponseEntity(ex.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/customers/update")
    public ResponseEntity updateCustomer(@RequestBody Customer customer, HttpServletRequest request) {
        String customerId = (String) request.getAttribute("customerId");
        try {
            return new ResponseEntity(iCustomerService.updateCustomer(customer, customerId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/customers/addfavres")
    public ResponseEntity updateFavRest(@RequestBody String restId, HttpServletRequest request) throws CustomerNotFoundException, RestaurantAlreatExistException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.addFavoriteRestaurant(restId,customerId),HttpStatus.OK);
    }

    @PutMapping("/customers/addfavdish")
    public ResponseEntity updateFavDish(@RequestBody String dishName, HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.addFavoriteDish(dishName,customerId),HttpStatus.OK);
    }

    @GetMapping("/customers/restaurant")
    public ResponseEntity fetchFavRest(HttpServletRequest request)
    {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.getAllFavRestaurant(customerId),HttpStatus.OK);
    }
    @GetMapping("/customers/dishes")
    public ResponseEntity fetchFavDish(HttpServletRequest request)
    {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.getAllFavDishes(customerId),HttpStatus.OK);
    }
    @GetMapping("/customers/eachcustomer")
    public ResponseEntity<?> fetchByJwtToken(HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.getCustomerById(customerId),HttpStatus.OK);
    }
    @GetMapping("/allCustomers")
    public ResponseEntity<?> fetchAllCustomer()
    {
        return new ResponseEntity<>(iCustomerService.getAllCustomer(),HttpStatus.OK);
    }
    @DeleteMapping("/customers/deletedish/{dishName}")
    public ResponseEntity<?> deleteFavDish(@PathVariable String dish, HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.deleteFavDish(customerId,dish),HttpStatus.OK);
    }
    @DeleteMapping("/customers/deleterestaurant")
    public ResponseEntity<?> deleteFavRest(@RequestParam String resId, HttpServletRequest request) {
        String customerId = (String) request.getAttribute("customerId");
        try{
            log.info("Inside customers/deletedrestaurant controller");
            return new ResponseEntity<>(iCustomerService.deleteFavRestaurant(customerId,resId),HttpStatus.OK);
        }catch(CustomerNotFoundException ex)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/customers/addresses/all")
    public ResponseEntity fetchAllAddresses(HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.fetchAllAddresses(customerId),HttpStatus.OK);
    }

    @PutMapping("/customers/addresses/addnew")
    public ResponseEntity addNewAddress(@RequestBody Address address, HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.addNewAddress(customerId, address),HttpStatus.CREATED);
    }

    @DeleteMapping("/customers/deleteone/{addressId}")
    public ResponseEntity removeAddress(@PathVariable String addressId, HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.deleteAddress(customerId, addressId),HttpStatus.OK);
    }

    @PutMapping("/customers/addresses/makeitprimary")
    public ResponseEntity makeItPrimary(@RequestBody Address address, HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.makeItPrimary(customerId, address),HttpStatus.OK);
    }

    @PutMapping("/addOrder/{customerId}/{orderId}")
    public ResponseEntity<?> addOrder(@PathVariable String customerId,@PathVariable String orderId) throws Exception {
        try{
            return new ResponseEntity<>(iCustomerService.addOrder(customerId,orderId),HttpStatus.CREATED);
        }catch (Exception ex)
        {
            return new ResponseEntity<>(ex.getStackTrace(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping(value = "/customers/upload/image",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> fileUpload(@RequestPart MultipartFile image, HttpServletRequest request) throws IOException
    {
        log.info("Inside the image controller");
        String customerId = (String) request.getAttribute("customerId");
        try{
            log.info("Inside the try of image controller");
            String fileName=iCustomerService.uploadImage(customerId,path,image);
            Customer customer=iCustomerService.getCustomerById(customerId);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        }catch (Exception ex)
        {
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
