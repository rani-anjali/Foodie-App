import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { customer } from '../../Model/customer';
import { UserService } from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { MatDialogRef } from '@angular/material/dialog';
import { customerLogin } from '../../Model/customerLogin';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  uniqueId: string = '';
  isLoading: boolean = false;
  uuidString: string = uuidv4();
  formSubmitted: boolean = false;

  userlogin: customerLogin = {
    customerEmail: '',
    customerPassword: ''
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    public cookieService: CookieService
  ) {}

  registerForm = this.fb.group({
    customerId: [this.uuidString],
    customerName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
    customerEmail: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
    customerPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.checkPasswordMismatch });

  get customerId() {
    return this.registerForm.get('customerId');
  }

  get customerName() {
    return this.registerForm.get('customerName');
  }

  get customerEmail() {
    return this.registerForm.get('customerEmail');
  }

  get customerPassword() {
    return this.registerForm.get('customerPassword');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;
    let registerCustomer: customer = this.registerForm.value as customer;
    // registerCustomer.customerCartId = this.generateUniqueKey();
    console.log(registerCustomer);
    this.userService.registerUser(registerCustomer).subscribe({
      next: data => {
        this.isLoading = false;
        console.log(data);
        this.userlogin.customerEmail = data.customerEmail;
        this.userlogin.customerPassword = data.customerPassword;
        this.closeDialoge();
        this.loginUser(this.userlogin);
      },
      error: err => {
        this.isLoading = false;
        console.log("Error", err);
      }
    });
  }

  generateUniqueKey() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `cart-${timestamp}-${randomNumber}`;
  }

  checkPasswordMismatch(c: AbstractControl) {
    const password = c.get('customerPassword');
    const confirmPass = c.get('confirmPassword');
    console.log("Password: "+password.value);
    console.log("Confirm Password: "+confirmPass.va);
    if (!password?.value || !confirmPass?.value) {
      return null;
    }
    return password.value === confirmPass.value ? null : { passwordMismatch: true };
  }

  loginUser(userlogin: customerLogin) {
    let customerJWT: string;
    this.userService.loginUser(userlogin).subscribe({
      next: data => {
        console.log(data);
        customerJWT = data;
        this.cookieService.set("token", customerJWT);
        this.afterLogin();
      },
      error: e => {
        console.log(e);
      }
    });
  }

  afterLogin() {
    this.userService.login(true);
  }

  closeDialoge() {
    this.dialogRef.close();
  }
}
