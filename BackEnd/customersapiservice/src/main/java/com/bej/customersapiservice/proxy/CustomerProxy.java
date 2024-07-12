package com.bej.customersapiservice.proxy;

import com.bej.customersapiservice.domain.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="UserAuthenticationService")
public interface CustomerProxy {

    @PostMapping("api/v1/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer);

}
