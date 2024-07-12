import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Order } from '../Model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http:HttpClient, private cookieService:CookieService) { }

  //Final Order Placing
  finalOrderPlacing(orderDetails:Order):Observable<Order> {

    return this.http.post<Order>(`http://localhost:8089/api/v4/order/add`, orderDetails);
  }

  //Fetching One Order
  fetchingOneOrder(orderId:string):Observable<Order> {
    return this.http.get<Order>(`http://localhost:8089/api/v4/orderById/${orderId}`);
  }

  //Fetching All Orders
  fetchingAllOrders():Observable<Array<Order>> {
    return this.http.get<Array<Order>>(`http://localhost:8089/api/v4/order/all`);
  }
}
