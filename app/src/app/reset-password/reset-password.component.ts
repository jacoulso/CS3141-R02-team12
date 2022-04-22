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
  }

  initForm(): void {
    this.resetForm = this.fb.group({
      uID: this.service.getUID(),
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required, Validators.minLength(6)],
      confirmPassword: ['', Validators.required],
    }, {
        validator: this.MustMatch('newPassword', 'confirmPassword')
      });
  }

  resetPassword() {
    this.errors = [];
    this.service.updatePassword(this.resetForm.value)
      .subscribe(() => {
        this.router.navigate(['/login'], { queryParams: { registered: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error); // notice how we never ever look at this array C;
        });
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

