package com.bej.proxy;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name="customersapiservice")
public interface CustomerProxy {
    @PutMapping("api/v2/addOrder/{customerId}/{orderId}")
    public ResponseEntity<?> addOrder(@PathVariable String customerId,@PathVariable String orderId);
}
