import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  // connect frontend to backend 
  apiUrl = "http://localhost:3000";
  loginAuthPath = this.apiUrl + "/login";

   // login autherization
   getUserAuth(userCred: string, password: string):Observable<any> {
    return this._http.get(this.loginAuthPath + `/${userCred}/${password}`);
  }
}
