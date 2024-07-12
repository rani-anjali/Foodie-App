package com.bej.customersapiservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Address {
    @Id
    private String addressId;
    private String address1;
    private String landMark;
    private String city;
    private long pincode;
    private String currentLocation;
}
