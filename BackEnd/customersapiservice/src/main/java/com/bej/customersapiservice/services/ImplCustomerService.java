package com.bej.customersapiservice.services;

import com.bej.customersapiservice.domain.Address;
import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.exception.CustomerNotFoundException;
import com.bej.customersapiservice.exception.RestaurantAlreatExistException;
import com.bej.customersapiservice.exception.SameEmailException;
import com.bej.customersapiservice.proxy.CustomerProxy;
import com.bej.customersapiservice.respository.CustomerRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
@Slf4j
@Service
public class ImplCustomerService implements ICustomerService {

    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private CustomerProxy customerProxy;

    @Override
    public Customer registerCustomer(Customer customer) throws CustomerAlreadyExistException, SameEmailException {
        if(customerRepo.findById(customer.getCustomerId()).isPresent()) {
            throw new CustomerAlreadyExistException();
        }
        if(customerRepo.findByCustomerEmail(customer.getCustomerEmail()).isPresent())
        {
            throw new SameEmailException();
        }
        if(customer.getCustomerFavDishes() ==  null) {
            customer.setCustomerFavDishes(new ArrayList<>());
        }
        if(customer.getCustomerFavRestaurants() == null) {
            customer.setCustomerFavRestaurants(new ArrayList<>());
        }
//
//        customerProxy.registerCustomer(customer);
//        return customerRepo.save(customer);
        Customer customer1=customerRepo.save(customer);
        if(!(customer1.getCustomerId().isEmpty()))
        {
            ResponseEntity<?> proxyResponse=customerProxy.registerCustomer(customer);
            System.out.println(proxyResponse.getBody());
        }

        return customer1;
    }

    public Customer updateCustomer(Customer customer, String customerId) throws CustomerNotFoundException {
        Customer customer1=customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
        customer1.setCustomerName(customer.getCustomerName());
        customer1.setCustomerPhone(customer.getCustomerPhone());
        return customerRepo.save(customer1);
    }

    @Override
    public String addFavoriteRestaurant(String resId,String customerId) throws CustomerNotFoundException, RestaurantAlreatExistException {
        System.out.println("Inside");
        System.out.println("Inside Imple :" + customerRepo.findById(customerId).get() +"Object :"+resId);
        Customer optionalCustomer=customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
        if(optionalCustomer.getCustomerFavRestaurants()==null)
        {
            optionalCustomer.setCustomerFavRestaurants(new ArrayList<>());
        }
        List<String> favList = optionalCustomer.getCustomerFavRestaurants();
        boolean isPresent=favList.stream().anyMatch(i->i.equals(resId));
        System.out.println(isPresent);
        if(isPresent)
        {
            throw new RestaurantAlreatExistException();
        }
        favList.add(resId);
        customerRepo.save(optionalCustomer);
        return "Favourite Restaurant added";
    }

    @Override
    public String addFavoriteDish(String restId, String customerId) throws CustomerNotFoundException {
        Customer customer= customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);

        if (customer.getCustomerFavDishes() == null) {
            customer.setCustomerFavDishes(new ArrayList<>());
        }

        List<String> favDishList = customer.getCustomerFavDishes();
        favDishList.add(restId);
        customerRepo.save(customer);
        return "Dish added to your favorites...";

    }

    @Override
    public List<String> getAllFavRestaurant(String customerId) {

        Optional<Customer> restCustomer = customerRepo.findById(customerId);
        System.out.println(restCustomer.get());
        return restCustomer.get().getCustomerFavRestaurants();
    }

    @Override
    public List<String> getAllFavDishes(String customerId) {
        Optional<Customer> restCustomer = customerRepo.findById(customerId);
        System.out.println(restCustomer.get());
        return restCustomer.get().getCustomerFavDishes();
    }

    @Override
    public Customer getCustomerById(String customerId) throws CustomerNotFoundException {
        return customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
    }

    @Override
    public boolean deleteFavRestaurant(String customerId,String resId) throws CustomerNotFoundException {
       boolean isDeleted=false;
       Customer customer=customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
       List<String> favRestList = customer.getCustomerFavRestaurants();
       System.out.println("Before deletion :"+favRestList);
       for(int i=0;i<favRestList.size();i++)
       {
           if(favRestList.get(i).equals(resId)){
               favRestList.remove(resId);
               isDeleted=true;
           }

       }
       System.out.println("After deletion :"+favRestList);
       customer.setCustomerFavRestaurants(favRestList);
       customerRepo.save(customer);
       return isDeleted;
    }
    public boolean deleteFavDish(String customerId,String dish) throws CustomerNotFoundException {
        boolean isDeleted=false;
        Optional<Customer> optionalCustomer=customerRepo.findById(customerId);

        if(optionalCustomer.isEmpty())
        {
            throw new CustomerNotFoundException();
        }
        Customer customer=optionalCustomer.get();

        List<String> favList = customer.getCustomerFavDishes();
        favList.remove(dish);
        customer.setCustomerFavDishes(favList);
        customerRepo.save(customer);
        isDeleted=true;

        return isDeleted;
    }

    @Override
    public List<Address> fetchAllAddresses(String customerId) throws CustomerNotFoundException {

        Customer customer = customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
        if(customer.getCustomerAddress() == null) {
            customer.setCustomerAddress(new ArrayList<>());
        }
        return customer.getCustomerAddress();

    }

    @Override
    public Address addNewAddress(String customerId, Address address) throws CustomerNotFoundException {
        Customer customer = customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
        if(customer.getCustomerAddress() == null) {
            customer.setCustomerAddress(new ArrayList<>());
        }

        List<Address> addressList = customer.getCustomerAddress();
        addressList.add(0,address);
        customer.setCustomerAddress(addressList);
        customerRepo.save(customer);
        return customer.getCustomerAddress().get(0);
    }


    @Override
    public boolean deleteAddress(String customerId, String addressId)  throws CustomerNotFoundException {
        Customer customer = customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
        List<Address> addressList = customer.getCustomerAddress();
        Address address = addressList.stream().filter(i -> i.getAddressId().equals(addressId)).collect(Collectors.toList()).get(0);
        boolean isDeleted = addressList.remove(address);
        customer.setCustomerAddress(addressList);
        customerRepo.save(customer);
        return isDeleted;
    }

    @Override
    public Address makeItPrimary(String customerId, Address address) throws CustomerNotFoundException {
        Customer customer = customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
        List<Address> addressList = customer.getCustomerAddress();
//        int index = IntStream.range(0, addressList.size())
//                .filter(i -> addressList.get(i).getAddressId().equals(address.getAddressId()))
//                .findFirst()
//                .orElseThrow(() -> new IllegalArgumentException("Address not found in customer's address list."));

        int index=-1;
        for (int i = 0; i < addressList.size(); i++) {
            if (addressList.get(i).getAddressId().equals(address.getAddressId())) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            // Swap the address to the primary position
            swap(addressList, 0, index);
        } else {
            throw new IllegalArgumentException("Address not found in customer's address list.");
        }

        // Update the customer with the new primary address
        customer.setCustomerAddress(addressList);
        customerRepo.save(customer);

        return addressList.get(0);

    }

    @Override
    public Customer addOrder(String customerId, String orderId) throws Exception {
        log.info("Inside the addOrder customer service");
        Customer customer=customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
        log.info("Customer: "+customer);
        if(customer.getCustomerOrderHistory()==null)
        {
            customer.setCustomerOrderHistory(new ArrayList<>());
        }
        List<String> orderList=customer.getCustomerOrderHistory();
        boolean isPresent=orderList.stream().anyMatch(i->i.equals(orderId));
        System.out.println(isPresent);
        if(isPresent)
        {
            throw new Exception();
        }
        orderList.add(orderId);
        customerRepo.save(customer);
        return customer;
    }

    @Override
    public List<Customer> getAllCustomer() {
        return customerRepo.findAll();
    }

    @Override
    public String uploadImage(String customerId, String path, MultipartFile file) throws IOException, CustomerNotFoundException {
        Customer customer=customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
        log.info("fetching customer :"+customer);
        String name=file.getOriginalFilename();
        log.info("File name:"+name);
        // Check if the file type is allowed (only JPEG and PNG)
        String contentType = file.getContentType();
        if (!isAllowedContentType(contentType)) {
            throw new IllegalArgumentException("Only JPEG and PNG files are allowed.");
        }
        //random name generated file
        String randomId= UUID.randomUUID().toString();
        String fileName1=randomId.concat(name.substring(name.lastIndexOf(".")));
        //FullPath
        String filePath=path+File.separator+fileName1;
        customer.setCustomerProfilePic(filePath);
        //create folder if not created
        File file1=new File(path);
        if(!file1.exists())
        {
            file1.mkdir();
        }
        //file copy
        Files.copy(file.getInputStream(), Paths.get(filePath));
        customer.setCustomerProfilePic(fileName1);
        customerRepo.save(customer);
        return filePath;
    }
    private boolean isAllowedContentType(String contentType) {
        return "image/jpeg".equals(contentType) || "image/png".equals(contentType);
    }

    private void swap(List<Address> addressList, int i, int index) {
        Address temp=addressList.get(i);
        addressList.set(i,addressList.get(index));
        addressList.set(index,temp);
    }

}
