import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // definite assertion for formgroup, the compiler is dumb
  loginForm!: FormGroup;
  errors: any = []; // make an empty array for safely storing/ignoring errors :D
  notify!: string;

  constructor(private service:ApiserviceService, private fb: FormBuilder, private router:Router, private route: ActivatedRoute) { }

  // Build our form, and read any params 
  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'registered';
      const key2 = 'loggedOut';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully registered. Please Log in';
      }
      if (params[key2] === 'success') {
        this.notify = 'You have been loggedout successfully';
      }
    });
    if (this.service.isAuthenticated()) { // If we are already logged in, just go to the home page...
      this.router.navigate(['/home'], { queryParams: {  } });
    }
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      userCred: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  login(): void {
    this.errors = [];
    this.service.login(this.loginForm.value)
      .subscribe((token) => {
        this.router.navigate(['/home'], { queryParams: {  } });
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }
}
