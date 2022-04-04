import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  public title!: string;
  public start!: Date;
  public end!: Date;
  
  event: Subject<any> = new Subject();
  
  addEvent(value: any) {
    this.event.next(value);
  }
  
  constructor() {
  }
}
