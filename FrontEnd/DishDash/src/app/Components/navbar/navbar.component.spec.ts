import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { customer } from '../../Model/customer';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeCustomer: customer;
  customerJwt: string;
  matBadge: number;
  showCart: boolean = false;

  logoutMessageVisible: boolean = false;
  loading: boolean = false;
url: any;

  constructor(private cookieService: CookieService, private userService: UserService, public dialog: MatDialog) {}
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    // Check if token exists and fetch active customer if it does
    if (this.cookieService.check("token")) {
      this.customerJwt = this.cookieService.get("token");
      this.fetchActiveCustomer();
    }

    // Subscribe to token subject to handle token-related actions
    this.userService.tokenSubject.subscribe({
      next: data => {
        if (!data) {
          this.logout();
        }
      },
      error: e => {
        console.error(e);
      }
    });

    // Subscribe to logInSubject to update login state
    this.userService.logInSubject.subscribe({
      next: data => {
        this.isLoggedIn = data;
        this.customerJwt = this.cookieService.get("token");
        this.fetchActiveCustomer();
      }
    });

    // Subscribe to loggedOutFromProfileSubject to handle profile logout
    this.userService.loggedOutFromProfileSubject.subscribe({
      next: data => {
        if (true) {
          this.logout();
        }
      },
      error: e => {
        console.error(e);
      }
    });
  }

  // Update the badge with the number of items in the cart
  noOfItemsChanges($event) {
    this.matBadge = $event;
  }

  // Handle user logout and display loading indicator
  logout() {
    this.cookieService.delete("token");
    this.loading = true;
    setTimeout(() => {
      this.cookieService.delete("token");
      this.isLoggedIn = false;
      this.loading = false;
      this.showLogoutMessage();
    }, 1000);
  }

  // Show a temporary message indicating successful logout
  showLogoutMessage() {
    this.logoutMessageVisible = true;
    setTimeout(() => {
      this.logoutMessageVisible = false;
    }, 3000);
  }

  // Open the login dialog
  openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginComponent, {
      width: "400px"
    });
  }

  // Open the signup dialog
  openSignupDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterComponent, {
      width: "400px"
    });
  }

  // Fetch active customer details using JWT token
  fetchActiveCustomer() {
    this.userService.fetchCustomerByJwt(this.customerJwt).subscribe({
      next: data => {
        this.activeCustomer = data;
        this.isLoggedIn = true;
      },
      error: e => {
        console.error(e);
      }
    });
  }
}
