import { Component } from '@angular/core';
import { customerLogin } from '../../Model/customerLogin';
import { RouterService } from '../../services/router.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  adminLogin: customerLogin = {
    customerEmail: '',
    customerPassword: ''
  };

  errorMessage: string | null = null;
  isLoadingSpinner = false;

  constructor(private routerService:RouterService, private cookieService:CookieService) {}

  loginUser() {
    if(this.adminLogin.customerEmail == "admin@dishdash.com" && this.adminLogin.customerPassword == "admin") {
      this.cookieService.delete('token', '/');
      this.cookieService.set("adminToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBkaXNoZGFzaC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.TpKRb1haGxZmWTAjjlMvxyy8jMi6_w9YBlxNaVTtM04")
      this.isLoadingSpinner = true;
      setTimeout(() => {
        this.routerService.navigateToAdminView();
        this.isLoadingSpinner = false;
      }, 2000)

    }

    else {

      this.isLoadingSpinner = false;
      this.errorMessage =  "Invalid email or password. Please try again";
      setTimeout(() => {
        this.errorMessage =  null;
      }, 3000)
  
    }

  }

}
