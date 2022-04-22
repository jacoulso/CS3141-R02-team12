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
  john: Subject<any> = new Subject();
  sam: Subject<any> = new Subject();

  addEvent(value: any) {
    this.event1.next(value);
  }

  sendString(value: any) {
    this.event2.next(value);
  }

  sendPriority(value: any) {
    this.event3.next(value);
  }
  
  addJohn(value: any) {
    this.john.next(value);
  }

  addSam(value: any) {
    this.sam.next(value);
  }

  constructor() {
  }
}