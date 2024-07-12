package com.bej.customersapiservice.filter;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JwtFilter extends GenericFilterBean {
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        ServletOutputStream servletOutputStream = httpServletResponse.getOutputStream();
        //expect the token from header
        String authHeader = httpServletRequest.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer"))
        {
            //If token is not coming then set the response status as UNAUTHORIZED
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            servletOutputStream.println("Missing or invalid Token");
            servletOutputStream.close();
        }else{
            //extract token from the header
            String jwtToken = authHeader.substring(7);//Bearer => 6+1 since token begins with bearer
            //token validation
            String customerId = Jwts.parser().setSigningKey("secretKey").parseClaimsJws(jwtToken).getBody().getSubject();
            httpServletRequest.setAttribute("customerId",customerId);
            filterChain.doFilter(servletRequest,servletResponse);//some more filters, controllers
        }
    }
}
