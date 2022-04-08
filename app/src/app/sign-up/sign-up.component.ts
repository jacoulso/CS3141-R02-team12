import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service:ApiserviceService, private fb: FormBuilder,  private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  } 

  registerForm!: FormGroup;
  errors: any = [];
  
  // send user register information to the server and go back to the login page
  register(): void {
    this.errors = [];
    this.service.register(this.registerForm.value)
      .subscribe(() => {
        this.router.navigate(['/login'], { queryParams: { registered: 'success' } });
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error); // notice how we never ever look at this array C;
        });
  }

  // build up our form
  initForm(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required], 
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')] ], // I am aware of how gross regex stuff is
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

}

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    let validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event: { preventDefault: () => void; stopPropagation: () => void; }) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
