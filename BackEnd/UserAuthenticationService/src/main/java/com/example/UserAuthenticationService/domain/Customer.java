package com.example.UserAuthenticationService.domain;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Customer {
    @Id
    private String customerId;
    private String customerEmail;
    private String customerPassword;
}
