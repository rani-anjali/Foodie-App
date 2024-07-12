package com.bej.services;

import com.bej.domain.Order;
import com.bej.domain.CartDish;
import com.bej.exceptions.OrderNotFoundException;
import com.bej.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GenerateEmailImpl implements GenerateEmail {
    @Autowired
    OrderRepo orderRepo;

    @Override
    public String orderCompletionEmail(String orderId, String customerName) throws OrderNotFoundException {
        Order order = orderRepo.findById(orderId).orElseThrow(OrderNotFoundException::new);
        StringBuilder emailContent = new StringBuilder();

        emailContent.append("Dear ").append(customerName).append(",\n\n")
                .append("Thank you for ordering with DishDash. Your order has been successfully placed and is being processed. Below are the details of your order:\n\n")
                .append("Order ID: ").append(orderId).append("\n\n")
                .append("Order Details:\n")
                .append("-------------------------------------------------\n")
                .append(String.format("%-30s %-10s %-15s %-15s\n", "Dish Name", "Quantity", "Price (INR)", "Total (INR)"))
                .append("-------------------------------------------------\n");

        for (CartDish dish : order.getCartItems()) {
            double total = dish.getDishPrice() * dish.getQuantity();
            emailContent.append(String.format("%-30s %-10d %-15.2f %-15.2f\n",
                    dish.getDishName(), dish.getQuantity(), dish.getDishPrice(), total));
        }

        emailContent.append("-------------------------------------------------\n")
                .append(String.format("%-30s %-10s %-15s %-15.2f\n", "Total Amount:", "", "", order.getBillingPrice()))
                .append("-------------------------------------------------\n\n")
                .append("If you have any questions or need further assistance, please feel free to contact our customer support team.\n\n")
                .append("Thank you for choosing DishDash!\n\n")
                .append("Best regards,\nDishDash Team");

        return emailContent.toString();
    }
}
