import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  // definite assertion for formgroup, the compiler is dumb
  resetForm!: FormGroup;
  submitted = false;
  errors: any = []; // make an empty array for safely storing/ignoring errors :D
  notify!: string;

  constructor(private service: ApiserviceService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

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
        this.notify = 'You have been logged out successfully';
      }
    });
    if (this.service.isAuthenticated()) { // If we are already logged in, just go to the home page...
      this.router.navigate(['/home'], { queryParams: {} });
    }
  }

  initForm(): void {
    this.resetForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required, Validators.minLength(6)],
      confirmPassword: ['', Validators.required],
    }, {
        validator: this.MustMatch('newPassword', 'confirmPassword')
      });
  }

  resetPassword() {

  }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    } else {
      this.resetPassword();
    }
  }

  onReset() {
    this.submitted = false;
    this.resetForm.reset();
  }


  get f() { return this.resetForm?.controls; }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // @ts-ignore
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}

