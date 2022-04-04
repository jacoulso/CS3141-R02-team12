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
    
    // Perform hashing here...
    console.log(`req ==> '${userCred}', '${password}'`);

    this.service.getUserAuth(userCred, password).subscribe( (res) => {
      console.log(res, "res==>")
    })
  }
  
}
