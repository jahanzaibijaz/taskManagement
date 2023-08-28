import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetails!: FormGroup;
  submitted: boolean = false;
  loading = { form: false };
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private LoginService: LoginService,
    private router: Router) { }

  ngOnInit() {

    this.loginDetails = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    })
  }

  get f() { return this.loginDetails.controls; }

  showHighlight(e: any) {
    const elem: HTMLElement | null = document.getElementById(e);
    elem?.setAttribute("style", "border: 1px solid red;");
  }

  onSubmit(): any {
    this.submitted = true;
    if (this.loginDetails.get('name')?.value === null) {
      this.toastr.warning("name required", "Error");
      this.showHighlight('name');
      this.submitted = false;
      return false;
    }


    if (this.loginDetails.get('password')?.value === '') {

      setTimeout(() => {
        this.submitted = false;
        this.toastr.error('Password required', 'Error', {
          timeOut: 3000,
        });
      }, 1000);
      return false;
    }
    let loginObj = {
      name: this.loginDetails.get('name')?.value,
      password: this.loginDetails.get('password')?.value
    }
    const isVerified = this.LoginService.login(loginObj);
    if (isVerified == true) {
      setTimeout(() => {
        this.submitted = true;
        this.toastr.success('Successfully Login', 'Succcess', {
          timeOut: 3000,
        });
        this.router.navigate(['todoTask'])
      }, 1000);
    }
    else {
      setTimeout(() => {

        this.toastr.error('Login Failed', 'Error', {
          timeOut: 3000,
        });
        this.submitted = false;
      }, 1000);
    }
  }
}
