package com.bej;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class OrderServiceApiApplication {

	public static void main(String[] args) {
		try {
			SpringApplication.run(OrderServiceApiApplication.class, args);
		} catch (Exception e) {
			e.printStackTrace();
			// Add any additional logging or handling here
		}
	}

}
