import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { customer } from '../../Model/customer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  customerJwt: string = '';
  spinnerVisible: boolean = false;
  updateMessageVisible: boolean = false;
  activeCustomer: customer = {
    customerId: '',
    customerName: '',
    customerEmail: '',
    customerPassword: '',
    customerPhone: '' // Ensure phone number is an empty string initially
  };

  updateForm = this.fb.group({
    customerId: [''],
    customerEmail: [{ value: '', disabled: true }],
    customerName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
    customerPhone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]] // Ensure phone number is initialized as an empty string
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.customerJwt = this.cookieService.get('token');
    this.fetchActiveCustomer();
  }

  fetchActiveCustomer() {
    this.userService.fetchCustomerByJwt(this.customerJwt).subscribe({
      next: data => {
        this.activeCustomer = data;
        // const customerPhone = this.activeCustomer.customerPhone !== null ? String(this.activeCustomer.customerPhone) : '';

        this.updateForm.patchValue({
          customerId: this.activeCustomer.customerId,
          customerEmail: this.activeCustomer.customerEmail,
          customerName: this.activeCustomer.customerName,
          customerPhone: this.activeCustomer.customerPhone// Handle null or empty phone number
        });
      },
      error: e => {
        console.log('Error while fetching Customer');
        console.log(e);
      }
    });
  }

  onSubmit() {
    this.spinnerVisible = true;
    const customer = this.updateForm.getRawValue(); // getRawValue to include disabled fields
    console.log(customer);

    this.userService.updateCustomer(this.customerJwt, customer).subscribe({
      next: data => {
        this.spinnerVisible = false;
        this.showUpdateMessage();
        console.log('Update Success');
      },
      error: e => {
        this.spinnerVisible = false;
        console.log('Update Failed');
      }
    });
  }

  showUpdateMessage() {
    this.updateMessageVisible = true;
    setTimeout(() => {
      this.updateMessageVisible = false;
    }, 3000);
  }
}
