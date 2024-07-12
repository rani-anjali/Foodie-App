import { Component, OnInit } from '@angular/core';
import { customerLogin } from '../../Model/customerLogin';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from '../../services/loading.service';
import { RegisterComponent } from '../register/register.component';
import { AuthserviceService } from '../../services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userlogin: customerLogin = {
    customerEmail: '',
    customerPassword: ''
  };

  customerJWT: string;
  errorMessage: string | null = null;
  isLoadingSpinner = false;
  loggedInSuccess:boolean = false;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    public loadingSevice: LoadingService,
    private authService:AuthserviceService
  ) {}

  ngOnInit(): void {
    this.userService.listenLogin.subscribe({
      next: data => {
        this.loginUser(data);
      },
      error: e => {
        console.log(e);
      }
    });
  }

  loginUser(userlogin: customerLogin): void {
    this.isLoadingSpinner = true;
    this.userService.loginUser(userlogin).subscribe({
      next: data => {
        this.isLoadingSpinner = false;
        console.log("My JWT " + data);
        this.customerJWT = data;
        this.cookieService.set("token", this.customerJWT, undefined, "/");
        this.afterLogin();
      
        this.loggedInSuccess = true;
        this.authService.navigateToRedirectUrl();
        setTimeout(() => {
          this.loggedInSuccess = false;
          this.closeDialoge();
        }, 1000)
      },
      error: e => {
        this.isLoadingSpinner = false;
        console.log(e);
        this.errorMessage = "Invalid email or password. Please try again";
      }
    });
  }

  afterLogin(): void {
    this.userService.login(true);
  }

  openRegister(): void {
    this.dialog.open(RegisterComponent, {
      width: "600px"
    });

    this.closeDialoge();
  }

  closeDialoge(): void {
    this.dialogRef.close();
  }
}
