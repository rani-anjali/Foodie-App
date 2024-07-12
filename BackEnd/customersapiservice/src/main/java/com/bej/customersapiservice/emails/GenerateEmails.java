package com.bej.customersapiservice.emails;

import org.springframework.stereotype.Service;

@Service
public class GenerateEmails implements IGenerateEmails {
    @Override
    public String generateWelcomeEmail(String customerName, String customerEmail, String customerPassword) {
        String body = String.format(
                "Dear %s,\n\n" +
                        "Welcome to DishDash!\n\n" +
                        "We are thrilled to have you on board. Here are your login credentials:\n\n" +
                        "User Email: %s\n" +
                        "Password: %s\n\n" +
                        "If you encounter any issues or have any questions, please don't hesitate to reach out to our support team.\n\n" +
                        "Thank you for choosing DishDash. We look forward to serving you.\n\n" +
                        "Best Regards,\n" +
                        "The DishDash Team",
                customerName, customerEmail, customerPassword
        );

        return body;
    }
}
