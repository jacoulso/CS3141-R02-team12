import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  ngOnInit(): void { }

  userLoginAuth(userCred: string, password: string): void {
    this.service.getUserAuth(userCred, password).subscribe( (res) => {
      console.log(res, "res==>")
    })
  }
}
