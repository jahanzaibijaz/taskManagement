import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoading: boolean =false;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false)
  constructor(private router: Router) { }

  login(obj:any) :boolean{
    console.log("OBJECT", obj)
    if(obj['name']== 'admin' && obj['password']== 'admin'){
   this.isLoggedIn$.next(true);
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('task');
    this.isLoggedIn$.next(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate([''])
  }
}
