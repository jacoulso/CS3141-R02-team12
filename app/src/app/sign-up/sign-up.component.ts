import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiserviceService } from '../apiservice.service'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:Router) { }

  ngOnInit(): void {} 

  

  // Attempt to register our user. reroutes to login if successful
  registerUser(userCred: string, password: string, email: string): void {
    this.service.registerUser(userCred, password, email).subscribe(  (res) => {
      goPlaces(this.router); 
    })
  }

}

function goPlaces(router: Router) {
  router.navigate(['/', 'login']);
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
