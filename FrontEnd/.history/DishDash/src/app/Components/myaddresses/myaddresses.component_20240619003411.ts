import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { address } from '../../Model/address';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-myaddresses',
  templateUrl: './myaddresses.component.html',
  styleUrls: ['./myaddresses.component.css']
})
export class MyaddressesComponent implements OnInit {

  allAddress: address[] = [];
  spinnerVisible: boolean = false;
  noAddresses: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.fetchAllAddresses();
  }

  fetchAllAddresses() {
    this.spinnerVisible = true;
    const Jwt = this.cookieService.get('token');
    this.userService.fetchAllCustomerAddress(Jwt).subscribe({
      next: data => {
        this.allAddress = data;
        this.noAddresses = this.allAddress.length === 0;
        this.spinnerVisible = false;
      },
      error: e => {
        console.log("Error in fetching addresses", e);
        this.spinnerVisible = false;
      }
    });
  }

  primaryAddress(address) {
    const Jwt = this.cookieService.get('token');
    this.userService.makeItPrimary(Jwt, address).subscribe({
      next: data => {
        console.log("Done Making it primary");
        this.fetchAllAddresses();
      },
      error: e => {
        console.log("Error while making it primary", e);
      }
    });
  }

  deleteAddress(addressId) {
    const Jwt = this.cookieService.get('token');
    this.userService.deleteAddress(Jwt, addressId).subscribe({
      next: data => {
        console.log("Deletion Success");
        this.fetchAllAddresses();
      },
      error: e => {
        console.log("Deletion Failure", e);
      }
    });
  }

  generateUniqueKey() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `address-${timestamp}-${randomNumber}`;
  }

  addressForm = this.fb.group({
    addressId: [],
    address1: ['', [Validators.required],
    landMark: ['', Validators.required],
    city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    pincode: [null, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    currentLocation: []
  });

  get addressId() {
    return this.addressForm.get('addressId');
  }

  get address1() {
    return this.addressForm.get('address1');
  }

  get landmark() {
    return this.addressForm.get('landMark');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get pincode() {
    return this.addressForm.get('pincode');
  }

  get currentLocation() {
    return this.addressForm.get('currentLocation');
  }

  onSubmit() {
    const random = this.generateUniqueKey();

    const addressNew = this.addressForm.value as address;
    addressNew.addressId = random;
    const Jwt = this.cookieService.get('token');

    this.userService.saveNewAddress(Jwt, addressNew).subscribe({
      next: data => {
        console.log("Address Added Successfully", data);
        this.fetchAllAddresses();
      },
      error: e => {
        console.log("Error while Saving Address", e);
      }
    });
  }
}
