import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../services/order-service.service';
import { Order } from '../../Model/Order';
import { CookieService } from 'ngx-cookie-service';
import { customer } from '../../Model/customer';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css'] // Ensure the correct key 'styleUrls'
})
export class OrderhistoryComponent implements OnInit {

  orderHistory: Order[] = [];
  orderIds: string[] = [];
  activeCustomer: customer;
  totalAmountSpent: number = 0;
  expandedOrderId: string | null = null;

  constructor(
    private orderService: OrderServiceService, 
    private cookieService: CookieService, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchActiveCustomer();
  }

  fetchActiveCustomer() {
    const Jwt = this.cookieService.get('token');
    this.userService.fetchCustomerByJwt(Jwt).subscribe({
      next: data => {
        this.activeCustomer = data;
        this.fetchCustomerOrderIds();
      },
      error: data => {
        console.log("Error while fetching customer");
      }
    });
  }

  fetchCustomerOrderIds() {
    this.orderIds = this.activeCustomer.customerOrderHistory; 
    this.fetchingAllOrderHistory();
  }

  fetchingAllOrderHistory() {
    this.orderIds.forEach(orderId => {
      this.orderService.fetchingOneOrder(orderId).subscribe({
        next: data => {
          console.log("Fetch Success");
          this.orderHistory.push(data);
          this.calculateTotalAmountSpent();
        },
        error: e => {
          console.log("Error while fetching Order History");
        }
      });
    });
  }

  toggleOrderDetails(orderId: string) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  calculateTotalAmountSpent() {
    this.totalAmountSpent = this.orderHistory.reduce((acc, order) => acc + order.totalPrice, 0);
  }
}
