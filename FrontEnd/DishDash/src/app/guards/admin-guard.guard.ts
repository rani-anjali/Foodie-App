import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  if(cookieService.get("adminToken")) {
    return true
  }
  else {
    router.navigateByUrl('admin/login')
    return false;
  }
};
