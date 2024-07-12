package com.bej.customersapiservice;

import com.bej.customersapiservice.respository.CustomerRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CustomersapiserviceApplicationTests {

	@Autowired
	private CustomerRepo cs;
	@Test
	void contextLoads() {
	}
	@Test
	void displayName()
	{
		System.out.println(cs.getClass().getName());
	}

}
