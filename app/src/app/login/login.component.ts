import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  // TODO: remove hardcoded values for get body parsing
  userCred = "jlmillim";
  password = "worm";

  ngOnInit(): void {
    this.service.getUserAuth(this.userCred, this.password).subscribe( (res) => {
      console.log(res, "res==>")
    })
  }
  
}
