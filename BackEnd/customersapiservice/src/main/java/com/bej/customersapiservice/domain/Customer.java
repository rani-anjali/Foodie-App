package com.bej.customersapiservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Customer {
    @Id
    private String customerId;
    private String customerName;
    private String customerEmail;
    private String customerPassword;

    private String customerProfilePic;//may need to delete
    private String customerPhone;
    private List<Address> customerAddress;
    private List<String> customerFavRestaurants;
    private List<String> customerFavDishes;//object
    private List<String> customerOrderHistory;

    public Customer(String customerProfilePic) {
        this.customerProfilePic = customerProfilePic;
    }
}
