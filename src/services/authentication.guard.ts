import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private login: LoginService,
    private router: Router ){}
  canActivate(): boolean
  {
    const isLoggedIn = this.login.isLoggedIn$.value;
    if(!isLoggedIn){
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
