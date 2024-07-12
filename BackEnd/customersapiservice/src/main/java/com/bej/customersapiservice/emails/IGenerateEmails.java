package com.bej.customersapiservice.emails;

public interface IGenerateEmails {
    public String generateWelcomeEmail(String customerName,String customerEmail,String customerPassword);
}
