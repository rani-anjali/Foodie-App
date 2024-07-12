package com.bej.customersapiservice.services;

import com.bej.customersapiservice.domain.Address;
import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.exception.CustomerNotFoundException;
import com.bej.customersapiservice.exception.RestaurantAlreatExistException;
import com.bej.customersapiservice.exception.SameEmailException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ICustomerService {

    public Customer registerCustomer(Customer customer) throws CustomerAlreadyExistException, SameEmailException;
    public Customer updateCustomer(Customer customer, String customerId) throws CustomerAlreadyExistException, CustomerNotFoundException;
    public String addFavoriteRestaurant(String resId,String customerId) throws CustomerNotFoundException, RestaurantAlreatExistException;
    public String addFavoriteDish(String obj,String customerId) throws CustomerNotFoundException;
    public List<String> getAllFavRestaurant(String customerId);
    public List<String> getAllFavDishes(String customerId);
    public Customer getCustomerById(String customerId) throws CustomerNotFoundException;
    public boolean deleteFavRestaurant(String customerId,String restId) throws CustomerNotFoundException;
    public boolean deleteFavDish(String customerId,String dishName) throws CustomerNotFoundException;

    public List<Address> fetchAllAddresses(String customerId) throws CustomerNotFoundException;
    public Address addNewAddress(String customerId, Address address) throws CustomerNotFoundException;

    public boolean deleteAddress(String customerId, String addressId)  throws CustomerNotFoundException;

    public Address makeItPrimary(String customerId, Address address) throws CustomerNotFoundException;
    public Customer addOrder(String customerId,String orderId) throws Exception;
    public List<Customer> getAllCustomer();
    String uploadImage(String customerId, String path, MultipartFile file) throws IOException, CustomerNotFoundException;

}
