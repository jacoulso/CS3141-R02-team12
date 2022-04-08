import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

// Define a custom token struct to use for storing and decoding
class Token {
  exp!: number;
  username!: string ;
}

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

   // connect frontend to backend 
  private apiUrl = "http://localhost:3000";
  private loginAuthPath = this.apiUrl + "/login";
  private registerPath = this.apiUrl + "/signup";
  private eventPath = this.apiUrl + "/events"

  private decodedToken = new Token();

  // ---- Authentication --------------------------------------

  constructor(private _http: HttpClient) { 
    // Define a token. compiler flags potential null assignments to values, hence the 'or null' 
    this.decodedToken = JSON.parse(localStorage.getItem('auth_meta') || '{}') || new Token();
  }

  public register(userData: any): Observable<any> {
    return this._http.post(this.registerPath, userData);
  }

  public login(userData: any): Observable<any> {
    return this._http.post(this.loginAuthPath, userData).pipe(map(token => {
      return this.saveToken(token);
    }));
  }

  // store the signed token in the browser
  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  // removes any tokens, prompting a login via the user
  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');

    this.decodedToken = new Token();
  }

  // unmount and verify the token 
  public isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }
}
