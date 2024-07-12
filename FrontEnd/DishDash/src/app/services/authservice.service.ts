import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private redirectUrl: string | null = null;
  constructor(private cookieService:CookieService, private router:Router) { }

  isAuthenticated() {
    if(this.cookieService.get('token')) {
      return true
    }
    else {
      return false;
    }
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  clearRedirectUrl() {
    this.redirectUrl = null;
  }

  navigateToRedirectUrl() {
    const redirectUrl = this.getRedirectUrl();
    if (redirectUrl) {
      this.router.navigate([redirectUrl]);
      this.clearRedirectUrl();
    }
  }


}
