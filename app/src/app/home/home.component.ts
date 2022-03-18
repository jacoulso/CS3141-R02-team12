import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    //this.openAppointmentList(date)
  }
  
  public events: CalendarEvent[] = [];

  constructor() {
  }

  ngOnInit(): void {

    this.events.push({
      start: new Date("2022-03-10T00:00-05:00"),
      end: new Date("2022-03-10T00:00-05:00"),
      color: {primary: "red", secondary: "blue"},
      title: "HelloWorld"
    })

  }
}
