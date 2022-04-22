import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  public title!: string;
  public start!: Date;
  public end!: Date;
  public priority!: number;
  public oldPriority!: number;
  public allDay!: boolean;
  public url!: string;

  event1: Subject<any> = new Subject();
  event2: Subject<any> = new Subject();
  event3: Subject<any> = new Subject();
  Sam: Subject<any> = new Subject();
  Justin: Subject<any> = new Subject();
  Artem: Subject<any> = new Subject();
  Ryan: Subject<any> = new Subject();
  School: Subject<any> = new Subject();
  Work: Subject<any> = new Subject();



  addEvent(value: any) {
    this.event1.next(value);
  }

  sendString(value: any) {
    this.event2.next(value);
  }

  sendPriority(value: any) {
    this.event3.next(value);
  }
  
  addSam(value: any) {
    this.Sam.next(value);
  }
  addJustin(value: any) {
    this.Justin.next(value);
  }
  addArtem(value: any) {
    this.Artem.next(value);
  }
  addRyan(value: any) {
    this.Ryan.next(value);
  }
  addSchool(value: any) {
    this.School.next(value);
  }
  addWork(value: any) {
    this.Work.next(value);
  }

  constructor() {
  }
}