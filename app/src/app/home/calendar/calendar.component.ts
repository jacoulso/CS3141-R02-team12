import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FullCalendarModule, FullCalendarComponent, CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import iCalendarPlugin from "@fullcalendar/icalendar";
import interactionPlugin from "@fullcalendar/interaction";
import {SenderService} from "../../sender.service";


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  iCalendarPlugin,
  interactionPlugin
])

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  
  constructor(
      private service: SenderService
  ) {
    this.service.event.subscribe( value => {
      if (value == this.service.title) {
        this.add(this.service.title, this.service.start, this.service.end);
      }
    })
  }
  
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      iCalendarPlugin,
      interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventsSet: this.handleEvents.bind(this),
    select: this.handleDateSelect.bind(this),
  };
  currentEvents: EventApi[] = [];

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    console.log(calendarApi.getEvents());
  }
  
  eventGuid = 0;
  createEventId() {
    return String(this.eventGuid++);
  }
  
  add(title:string, start:Date, end:Date) {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.addEvent({
      id: this.createEventId(),
      title: title,
      start: start,
      end: end
    })
  }
  
  ngOnInit(): void {
  }
  
}