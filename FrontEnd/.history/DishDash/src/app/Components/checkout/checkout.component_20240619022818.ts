import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { CartServiceService } from '../../services/cart-service.service';
import { customer } from '../../Model/customer';
import { CartDish } from '../../Model/CartDish';
import { Order } from '../../Model/Order';
import { RouterService } from '../../services/router.service';
import { OrderServiceService } from '../../services/order-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems:CartDish[]= [];
  primaryAddress:any = {};
  activeCustomer: customer;
  totalAmount: number = 0;
  isLoadingSpinner:boolean = false;

  orderDetail:Order = {
    orderId: '',
    restaurantId: '',
    customerId: '',
    cu
    timeStamp: '',
    totalPrice: 0,
    discount: 0,
    billingPrice: 0,
    totalItems: 0,
    customerAddress: {
      address1: '',
      landMark: '',
      city: '',
      pincode: 0
    },
    paymentMethod: '',
    cartItems: []
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private routerService:RouterService,
    private orderService:OrderServiceService
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      phone: ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchActiveCustomer();
    this.loadCartItems();
  }

  fetchActiveCustomer() {
    const Jwt = this.cookieService.get('token');
    this.userService.fetchCustomerByJwt(Jwt).subscribe({
      next: data => {
        this.activeCustomer = data;
        this.checkoutForm.patchValue({
          name: this.activeCustomer.customerName,
          email: this.activeCustomer.customerEmail,
          phone: this.activeCustomer.customerPhone
        });
        this.primaryAddress = this.activeCustomer.customerAddress[0]; // Assuming address is part of customer model
      },
      error: e => {
        console.log('Error while fetching the customer', e);
      }
    });
  }

  loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = cart;
    this.totalAmount = this.cartItems.reduce((acc, item) => acc + item.dishPrice * item.quantity, 0);
  }

  //Total Count Update
  countTotalItems():number {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((total:number, item:any) => total+item.quantity, 0);
  }

  

  onSubmit() {
    this.isLoadingSpinner = true;
    
this.orderDetail.orderId = this.generateUniqueKey();
this.orderDetail.restaurantId = this.cartItems[0].restaurantId;
this.orderDetail.customerId = this.activeCustomer.customerId;
this.orderDetail.timeStamp = new Date().toDateString();
this.orderDetail.totalPrice = this.totalAmount;
this.orderDetail.discount = 0;
this.orderDetail.billingPrice = this.totalAmount;
this.orderDetail.totalItems = this.countTotalItems();
this.orderDetail.customerAddress = this.activeCustomer.customerAddress[0];
this.orderDetail.paymentMethod = this.checkoutForm.get('paymentMethod').value;
this.orderDetail.cartItems = this.cartItems;
console.log(this.orderDetail);

//Now sending it to backend
      this.orderService.finalOrderPlacing(this.orderDetail).subscribe({
        next:data => {
          console.log("Order Success")

          localStorage.setItem('cart', JSON.stringify([]));
          const event = new Event('storage');
    window.dispatchEvent(event)
          this.routerService.navigateToOrderCompletion(this.orderDetail.orderId);
          this.isLoadingSpinner= false;
        },
        error:e => {
          console.log(e);
          console.log("Order Failure")
          this.isLoadingSpinner= false;
        }
      })

  
  }

  //Genrating usnique order id

  generateUniqueKey() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 10000);
    return `orderId-${timestamp}-${randomNumber}`;
  }
}
