import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiserviceService } from '../apiservice.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:Router) { }

  ngOnInit(): void { }

  userLoginAuth(userCred: string, password: string): void {
    this.service.getUserAuth(userCred, password).subscribe( (res) => {
      if (res.successCode) goPlaces(this.router); // if we succeeded go to home
    })
  }
}

function goPlaces(router: Router) {
  router.navigate(['/', 'home']);
}
