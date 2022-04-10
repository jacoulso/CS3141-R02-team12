import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import {MdbValidationModule} from "mdb-angular-ui-kit/validation";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AppRoutingModule, routingComponents} from "../app-routing.module";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  validationForm: FormGroup;

  constructor( private router:Router) {
    this.validationForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.pattern(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/)),
      cPassword: new FormControl(null, Validators.pattern(/.*/)),

    });
  }


  get username(): AbstractControl {
    return this.validationForm.get('username')!;
  }

  get email(): AbstractControl {
    return this.validationForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.validationForm.get('password')!;
  }

  get cPassword(): AbstractControl {
    return this.validationForm.get('cPassword')!;
  }

  ngOnInit(): void {
  }
}
/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}