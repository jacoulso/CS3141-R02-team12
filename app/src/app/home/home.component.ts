import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarModule } from 'angular-calendar';
import {SidebarComponent} from "./sidebar/sidebar.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public viewDate: Date = new Date();
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
