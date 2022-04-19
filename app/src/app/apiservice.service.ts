import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

// Define a custom token struct to use for storing and decoding
class Token {
  exp!: number;
  username!: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  // connect frontend to backend 
  private apiUrl = "http://localhost:3000";
  private loginAuthPath = this.apiUrl + "/login";
  private registerPath = this.apiUrl + "/signup";
  private calendarPath = this.apiUrl + "/calendars"
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

  public getUID(): string {
    return JSON.parse(localStorage.getItem('auth_meta') || '{}').uID
  }


  // ---- Calendars -------------------------------------------

  // Given a uID, return all the calendars
  public getAllCalendars(uID: string): Observable<any> {
    return this._http.get<any>(this.calendarPath + `?uID=${uID}`);
  }

  // Given a uID and a cID, return the calendar associated 
  public getOneCalendar(uID: any, cID: any): Observable<any> {
    return this._http.get<any>(this.calendarPath + `/calendar?uID=${uID}&cID=${cID}`);
  }

  // Given a uID and a title, ask the server to create a new calendar with it
  public createCalendarForUser(uID: any, title: any): Observable<any> {
    return this._http.post(this.calendarPath + "/calendar", { uID, title } );
  }


  // ---- Events ----------------------------------------------

  // GET all the events associated with a calendar
  public getCalendarEvents(uID: any, cID: any): Observable<any> {
    return this._http.get<any>(this.eventPath + `/getAll?uID=${uID}&cID=${cID}`);
  }

  // Get a specific event from a calendar
  public getEvent(uID: any, cID: any, eID: any): Observable<any>{
    return this._http.get<any>(this.eventPath + `/getOne??uID=${uID}&cID=${cID}&eID=${eID}`);
  }

  // Add a specific event to a specific calendar
  public addEvent(body: any): Observable<any>{
    return this._http.post(this.eventPath + `/add`, body);
  }

  // Update a specific event
  public updateEvent(body: any): Observable<any>{
    return this._http.post(this.eventPath + `/update`, body);
  }

  // Remove an event given the event ID
  public deleteEvent(body: any): Observable<any>{
    return this._http.post(this.eventPath + `/delete`, body);
  }


}
