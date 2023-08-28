import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit   {
  title = 'taskManagement';
  isLoggedIn:boolean = false;

  constructor(private loginService: LoginService){
  }
  ngOnInit(){
    this.isLoggedIn = this.loginService.isLoggedIn$.value;
   console.log("isLoggedIn", this.isLoggedIn) 
  }

  
  logout(){
    console.log("logout")
    this.loginService.logout();
  }
}


